"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearSession,
  enrollProgram,
  getSession,
  getUserAccess,
  hasReportAccess,
  isBookmarked as checkBookmark,
  isNewsletterSubscribed,
  purchaseReport,
  setSession,
  subscribeNewsletter,
  toggleBookmark,
  unlockFreeReport,
  type OrderRecord,
  type Session,
  type UserAccess,
} from "@/lib/access-store";

type AuthContextValue = {
  session: Session | null;
  access: UserAccess;
  ready: boolean;
  login: (data: Session) => void;
  logout: () => void;
  unlockFree: (slug: string, email?: string) => void;
  purchase: (
    slug: string,
    title: string,
    amount: string,
    email?: string,
    gateway?: string,
  ) => void;
  enroll: (
    slug: string,
    title: string,
    amount: string,
    email?: string,
    gateway?: string,
  ) => void;
  canAccessReport: (slug: string, tier: "Free" | "Paid") => boolean;
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (slug: string) => void;
  subscribeNewsletter: (email: string) => boolean;
  isNewsletterSubscribed: (email: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [access, setAccess] = useState<UserAccess>({
    purchased: [],
    free: [],
    bookmarks: [],
    enrollments: [],
    orders: [],
  });
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const current = getSession();
    setSessionState(current);
    setAccess(
      current
        ? getUserAccess(current.email)
        : {
            purchased: [],
            free: [],
            bookmarks: [],
            enrollments: [],
            orders: [],
          },
    );
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  const login = useCallback(
    (data: Session) => {
      setSession(data);
      refresh();
    },
    [refresh],
  );

  const logout = useCallback(() => {
    clearSession();
    refresh();
  }, [refresh]);

  const unlockFree = useCallback(
    (slug: string, email?: string) => {
      const target = (email ?? session?.email)?.trim().toLowerCase();
      if (!target) return;
      unlockFreeReport(target, slug);
      refresh();
    },
    [session, refresh],
  );

  const purchase = useCallback(
    (
      slug: string,
      title: string,
      amount: string,
      email?: string,
      gateway?: string,
    ) => {
      const target = (email ?? session?.email)?.trim().toLowerCase();
      if (!target) return;
      purchaseReport(target, slug, title, amount, gateway);
      refresh();
    },
    [session, refresh],
  );

  const enroll = useCallback(
    (
      slug: string,
      title: string,
      amount: string,
      email?: string,
      gateway?: string,
    ) => {
      const target = (email ?? session?.email)?.trim().toLowerCase();
      if (!target) return;
      enrollProgram(target, slug, title, amount, gateway);
      refresh();
    },
    [session, refresh],
  );

  const canAccessReport = useCallback(
    (slug: string, tier: "Free" | "Paid") => {
      if (!session) return false;
      return hasReportAccess(session.email, slug, tier);
    },
    [session],
  );

  const isBookmarkedFn = useCallback(
    (slug: string) => (session ? checkBookmark(session.email, slug) : false),
    [session],
  );

  const toggleBookmarkFn = useCallback(
    (slug: string) => {
      if (!session) return;
      toggleBookmark(session.email, slug);
      refresh();
    },
    [session, refresh],
  );

  const subscribeNewsletterFn = useCallback((email: string) => {
    subscribeNewsletter(email);
    return true;
  }, []);

  const value = useMemo(
    () => ({
      session,
      access,
      ready,
      login,
      logout,
      unlockFree,
      purchase,
      enroll,
      canAccessReport,
      isBookmarked: isBookmarkedFn,
      toggleBookmark: toggleBookmarkFn,
      subscribeNewsletter: subscribeNewsletterFn,
      isNewsletterSubscribed,
    }),
    [
      session,
      access,
      ready,
      login,
      logout,
      unlockFree,
      purchase,
      enroll,
      canAccessReport,
      isBookmarkedFn,
      toggleBookmarkFn,
      subscribeNewsletterFn,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export type { OrderRecord, Session, UserAccess };
