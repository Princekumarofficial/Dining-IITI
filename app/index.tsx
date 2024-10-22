import { Text, Image, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome } from "@expo/vector-icons";

const Index = () => {
  const globalContext = useGlobalContext();
  const { loggedIn, loading } = globalContext!;

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="h-full flex px-6"
      >
        <Image source={require("@/app/assets/images/iiti-logo.png")} />
        <Text className="font-DMSans text-2xl font-semibold py-4">
          Dining IITI
        </Text>
        {loggedIn ? (
          <Button onPress={() => router.push("/home")} isLoading={loading}>
            <FontAwesome name="home" size={20} color="white" />
            {"  "}Home
          </Button>
        ) : (
          <Button onPress={() => router.push("/sign-in")} isLoading={loading}>
            <FontAwesome name="sign-in" size={20} color="white" />
            {"  "}Sign In
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
