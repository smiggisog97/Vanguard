export type Session = {
  email: string;
  firstName?: string;
  company?: string;
  role?: string;
  verified?: boolean;
};

export type UserAccess = {
  purchased: string[];
  free: string[];
  bookmarks: string[];
  enrollments: string[];
  orders: OrderRecord[];
};

export type OrderRecord = {
  id: string;
  slug: string;
  title: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  date: string;
  type: "research" | "program";
  gateway?: string;
};

const SESSION_KEY = "vanguard_session";
const ACCESS_KEY = "vanguard_access";
const NEWSLETTER_KEY = "vanguard_newsletter";

function readAccessMap(): Record<string, UserAccess> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(ACCESS_KEY) ?? "{}") as Record<string, UserAccess>;
  } catch {
    return {};
  }
}

function writeAccessMap(map: Record<string, UserAccess>) {
  localStorage.setItem(ACCESS_KEY, JSON.stringify(map));
}

function emptyAccess(): UserAccess {
  return { purchased: [], free: [], bookmarks: [], enrollments: [], orders: [] };
}

function normalize(email: string) {
  return email.trim().toLowerCase();
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, email: normalize(session.email) }));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getUserAccess(email: string): UserAccess {
  const map = readAccessMap();
  return map[normalize(email)] ?? emptyAccess();
}

function updateAccess(email: string, updater: (access: UserAccess) => UserAccess) {
  const key = normalize(email);
  const map = readAccessMap();
  const access = map[key] ?? emptyAccess();
  map[key] = updater(access);
  writeAccessMap(map);
}

export function unlockFreeReport(email: string, slug: string) {
  updateAccess(email, (access) => {
    if (access.free.includes(slug)) return access;
    return { ...access, free: [...access.free, slug] };
  });
}

export function purchaseReport(email: string, slug: string, title: string, amount: string, gateway?: string) {
  updateAccess(email, (access) => {
    const order: OrderRecord = {
      id: `ord_${Date.now()}`,
      slug,
      title,
      amount,
      status: "completed",
      date: new Date().toISOString().split("T")[0],
      type: "research",
      gateway,
    };
    return {
      ...access,
      purchased: access.purchased.includes(slug) ? access.purchased : [...access.purchased, slug],
      orders: [order, ...access.orders],
    };
  });
}

export function enrollProgram(email: string, slug: string, title: string, amount: string, gateway?: string) {
  updateAccess(email, (access) => {
    const order: OrderRecord = {
      id: `ord_${Date.now()}`,
      slug,
      title,
      amount,
      status: "completed",
      date: new Date().toISOString().split("T")[0],
      type: "program",
      gateway,
    };
    return {
      ...access,
      enrollments: access.enrollments.includes(slug) ? access.enrollments : [...access.enrollments, slug],
      orders: [order, ...access.orders],
    };
  });
}

export function toggleBookmark(email: string, slug: string): boolean {
  let bookmarked = false;
  updateAccess(email, (access) => {
    if (access.bookmarks.includes(slug)) {
      bookmarked = false;
      return { ...access, bookmarks: access.bookmarks.filter((s) => s !== slug) };
    }
    bookmarked = true;
    return { ...access, bookmarks: [...access.bookmarks, slug] };
  });
  return bookmarked;
}

export function isBookmarked(email: string, slug: string): boolean {
  return getUserAccess(email).bookmarks.includes(slug);
}

export function hasReportAccess(email: string | null, slug: string, tier: "Free" | "Paid"): boolean {
  if (!email) return false;
  const access = getUserAccess(email);
  if (tier === "Paid") return access.purchased.includes(slug);
  return access.free.includes(slug);
}

export function isNewsletterSubscribed(email: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const subs = JSON.parse(localStorage.getItem(NEWSLETTER_KEY) ?? "[]") as string[];
    return subs.includes(normalize(email));
  } catch {
    return false;
  }
}

export function subscribeNewsletter(email: string) {
  if (typeof window === "undefined") return;
  try {
    const subs = JSON.parse(localStorage.getItem(NEWSLETTER_KEY) ?? "[]") as string[];
    const key = normalize(email);
    if (!subs.includes(key)) {
      localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([...subs, key]));
    }
  } catch {
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([normalize(email)]));
  }
}
