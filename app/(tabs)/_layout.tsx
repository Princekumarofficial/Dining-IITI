import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { isAuthenticated } from "@/helpers/auth";
import { Toast } from "toastify-react-native";
import { useGlobalContext } from "@/context/GlobalProvider";

const TabsLayout = () => {
  const { updateAuth } = useGlobalContext()!;

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      if (!auth) {
        Toast.error("You have been logged out");
        updateAuth();
        router.replace("/(auth)/sign-in");
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <Tabs
        screenOptions={{
          //   tabBarShowLabel: false,
          tabBarActiveTintColor: "#145DA0",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#B1D4E0",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={"home"} size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="qr"
          options={{
            title: "QR",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={"qr-code"} size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="logs"
          options={{
            title: "Logs",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={"list"} size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={"person-circle"} size={32} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
