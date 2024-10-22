import { apiCall } from "./api";
import * as SecureStore from "expo-secure-store";

export const login = async (username: string, password: string) => {
  try {
    const res = await apiCall("/auth/login", {
      method: "POST",
      body: {
        username,
        password,
      },
      recieveResponse: true,
      isAuth: false,
    });

    if (res.token) {
      await SecureStore.setItemAsync("accessToken", res.token);
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const logout = async () => {
  const res = await apiCall("/auth/logout", {
    method: "POST",
    recieveResponse: false,
  });
  if (res) {
    SecureStore.deleteItemAsync("accessToken");
    return true;
  } else {
    return false;
  }
};

export const isAuthenticated = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (!accessToken) {
    return false;
  }
  try {
    const res = await apiCall("/auth/is_authenticated");
    if (res) {
      return true;
    } else {
      SecureStore.deleteItemAsync("accessToken");
      return false;
    }
  } catch {
    SecureStore.deleteItemAsync("accessToken");
    return false;
  }
};

export const getUserDetails = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (!accessToken) {
    return false;
  }
  try {
    const res = await apiCall("/auth/user");
    if (res) {
      return res;
    } else {
      SecureStore.deleteItemAsync("accessToken");
      return false;
    }
  } catch {
    SecureStore.deleteItemAsync("accessToken");
    return false;
  }
};
