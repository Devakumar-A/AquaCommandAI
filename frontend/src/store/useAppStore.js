import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // Theme
  theme: 'dark',
  setTheme: (theme) => {
    set({ theme });
    document.documentElement.classList.remove('dark', 'light', 'system');
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.classList.add(theme);
    }
  },
  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },

  // Auth
  user: null,
  isAuthenticated: false,
  authLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // Splash
  splashDone: false,
  setSplashDone: (splashDone) => set({ splashDone }),

  // Sidebar
  sidebarOpen: true,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  // Notifications
  notifications: [],
  addNotification: (notif) => set((s) => ({ 
    notifications: [{ id: Date.now(), ...notif }, ...s.notifications].slice(0, 10) 
  })),
  clearNotifications: () => set({ notifications: [] }),

  // Predictions cache
  cropResult: null,
  setCropResult: (cropResult) => set({ cropResult }),
  yieldResult: null,
  setYieldResult: (yieldResult) => set({ yieldResult }),
  waterResult: null,
  setWaterResult: (waterResult) => set({ waterResult }),
  reservoirResult: null,
  setReservoirResult: (reservoirResult) => set({ reservoirResult }),
  advisoryResult: null,
  setAdvisoryResult: (advisoryResult) => set({ advisoryResult }),
}));

export default useAppStore;
