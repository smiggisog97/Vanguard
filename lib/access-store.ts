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

function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readAccessMap(): Record<string, UserAccess> {
  if (typeof window === "undefined") return {};
  const parsed = safeParseJSON<unknown>(localStorage.getItem(ACCESS_KEY), {});
  // Guard: must be a plain object
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
  return parsed as Record<string, UserAccess>;
}

function writeAccessMap(map: Record<string, UserAccess>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACCESS_KEY, JSON.stringify(map));
  } catch {
    // localStorage quota exceeded or unavailable — silently ignore
  }
}

function emptyAccess(): UserAccess {
  return { purchased: [], free: [], bookmarks: [], enrollments: [], orders: [] };
}

/** Ensures a stored record has all required array fields, merging any missing ones. */
function normalizeAccess(stored: unknown): UserAccess {
  if (typeof stored !== "object" || stored === null) return emptyAccess();
  const s = stored as Record<string, unknown>;
  return {
    purchased: Array.isArray(s.purchased) ? (s.purchased as string[]) : [],
    free: Array.isArray(s.free) ? (s.free as string[]) : [],
    bookmarks: Array.isArray(s.bookmarks) ? (s.bookmarks as string[]) : [],
    enrollments: Array.isArray(s.enrollments) ? (s.enrollments as string[]) : [],
    orders: Array.isArray(s.orders) ? (s.orders as OrderRecord[]) : [],
  };
}

function normalize(email: string | null | undefined): string {
  if (!email || typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const parsed = safeParseJSON<unknown>(localStorage.getItem(SESSION_KEY), null);
  if (typeof parsed !== "object" || parsed === null) return null;
  const s = parsed as Record<string, unknown>;
  if (typeof s.email !== "string" || !s.email) return null;
  return parsed as Session;
}

export function setSession(session: Session) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ ...session, email: normalize(session.email) }),
    );
  } catch {
    // ignore
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function getUserAccess(email: string): UserAccess {
  const map = readAccessMap();
  return normalizeAccess(map[normalize(email)]);
}

function updateAccess(email: string, updater: (access: UserAccess) => UserAccess) {
  const key = normalize(email);
  if (!key) return;
  const map = readAccessMap();
  // Use normalizeAccess so stale records are always safe to mutate
  const access = normalizeAccess(map[key]);
  map[key] = updater(access);
  writeAccessMap(map);
}

export function unlockFreeReport(email: string, slug: string) {
  updateAccess(email, (access) => {
    if (access.free.includes(slug)) return access;
    return { ...access, free: [...access.free, slug] };
  });
}

export function purchaseReport(
  email: string,
  slug: string,
  title: string,
  amount: string,
  gateway?: string,
) {
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
      purchased: access.purchased.includes(slug)
        ? access.purchased
        : [...access.purchased, slug],
      orders: [order, ...access.orders],
    };
  });
}

export function enrollProgram(
  email: string,
  slug: string,
  title: string,
  amount: string,
  gateway?: string,
) {
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
      enrollments: access.enrollments.includes(slug)
        ? access.enrollments
        : [...access.enrollments, slug],
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

export function hasReportAccess(
  email: string | null,
  slug: string,
  tier: "Free" | "Paid",
): boolean {
  if (!email) return false;
  const access = getUserAccess(email);
  if (tier === "Paid") return access.purchased.includes(slug);
  return access.free.includes(slug);
}

export function isNewsletterSubscribed(email: string): boolean {
  if (typeof window === "undefined") return false;
  const raw = safeParseJSON<unknown>(localStorage.getItem(NEWSLETTER_KEY), []);
  const subs = Array.isArray(raw) ? (raw as string[]) : [];
  return subs.includes(normalize(email));
}

export function subscribeNewsletter(email: string) {
  if (typeof window === "undefined") return;
  const key = normalize(email);
  if (!key) return;
  const raw = safeParseJSON<unknown>(localStorage.getItem(NEWSLETTER_KEY), []);
  const subs = Array.isArray(raw) ? (raw as string[]) : [];
  if (!subs.includes(key)) {
    try {
      localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([...subs, key]));
    } catch {
      // ignore quota errors
    }
  }
}
