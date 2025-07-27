import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface User {
  _id?: string;
  email: string;
  username?: string;
  picture?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  authLoader: boolean;
  signin: (formData: { email: string; password: string }) => Promise<number>;
  register: (formData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<number>;
  verifyCode: (formData: { code: string; email: string }) => Promise<number>;
  changePassword: (formData: {
    password: string;
    newPassword: string;
  }) => Promise<number>;
  googleSignin: () => void;
  verify: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticatedLoading: true,
  authLoader: false,

  register: async (formData) => {
    try {
      set({ authLoader: true });
      const response = await axiosInstance.post(
        "/api/v1/auth/register",
        formData
      );
      toast.success("Successfully registered");
      set({
        user: response.data.user,
      });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Signup failed");
      set({ authLoader: false });
      return 0;
    }
  },

  verifyCode: async (formData) => {
    try {
      set({ authLoader: true });
      await axiosInstance.post("/api/v1/auth/verify-email", formData);
      toast.success("Verification successful now login to continue");
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Verification failed");
      set({ authLoader: false });
      return 0;
    }
  },

  signin: async (formData) => {
    try {
      set({ authLoader: true });
      const response = await axiosInstance.post("/api/v1/auth/login", formData);
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      toast.success(response.data.msg);
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Login failed");
      set({ authLoader: false });
      return 0;
    }
  },

  changePassword: async (formData) => {
    try {
      set({ authLoader: true });
      const response = await axiosInstance.post(
        "/api/v1/auth/change-password",
        formData
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ authLoader: false });
      return 1;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Login failed");
      set({ authLoader: false });
      return 0;
    }
  },

  verify: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/verify");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      set({ isAuthenticatedLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ user: null, isAuthenticated: false });
      await axiosInstance.get("/api/v1/auth/logout");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Logout failed");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  googleSignin: async () => {
    try {
      set({ user: null, isAuthenticated: false });
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/api/v1/auth/google`;
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Google Signin failed");
    } finally {
    }
  },
}));

export default useAuthStore;
