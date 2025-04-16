import { apiCall } from "./api";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const storage = {
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  deleteItem: async (key: string) => {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

export const login = async (username: string, password: string) => {
  try {
    const res = await apiCall("/auth/login", {
      method: "POST",
      body: { username, password },
      recieveResponse: true,
      isAuth: false,
    });

    if (res.token) {
      await storage.setItem("accessToken", res.token);
      return true;
    }
    return false;
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
    await storage.deleteItem("accessToken");
    return true;
  }
  return false;
};

export const isAuthenticated = async () => {
  const accessToken = await storage.getItem("accessToken");
  if (!accessToken) return false;

  try {
    const res = await apiCall("/auth/is_authenticated", {
      recieveResponse: false,
    });
    if (res) return true;
    await storage.deleteItem("accessToken");
    return false;
  } catch {
    await storage.deleteItem("accessToken");
    return false;
  }
};

export const getUserDetails = async () => {
  const accessToken = await storage.getItem("accessToken");
  if (!accessToken) return false;

  try {
    const res = await apiCall("/auth/user");
    if (res) return res;
    await storage.deleteItem("accessToken");
    return false;
  } catch {
    await storage.deleteItem("accessToken");
    return false;
  }
};
