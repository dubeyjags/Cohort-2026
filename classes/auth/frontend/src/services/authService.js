import api from "./api.js";
import { tokenStore } from "./tokenStore.js";

export const register = async (username, email, password) => {
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const response = await api.post("/register", { username, email, password });
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    if (!email || !password) throw new Error("All fields are required");

    if (tokenStore.getAccess() || tokenStore.getRefresh()) {
      throw new Error("You are already logged in");
    }
    const response = await api.post("/login", { email, password });
    const data = response.data;
    tokenStore.set(data.accessToken, data.refreshToken, data.user);
    return data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    if (!email) throw new Error("Email is required");
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    if (!token) throw new Error("Reset token is required");
    if (!newPassword) throw new Error("New password is required");
    const response = await api.post(`/reset-password?token=${token}`, { newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      throw new Error("First name, last name, and email are required");
    }
    const response = await api.put("/profile", profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const refreshToken = tokenStore.getRefresh();
    await api.post("/logout", { refreshToken });
    tokenStore.clear();
  } catch (error) {
    throw error;
  }
};
