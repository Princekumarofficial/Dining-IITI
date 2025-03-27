import { Text, Image, ScrollView, StyleSheet } from "react-native";
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <Image source={require("@/app/assets/images/iiti-logo.png")} />
        <Text style={styles.title}>Dining IITI</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24, // px-6 in Tailwind
  },
  scrollViewContent: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "DMSans",
    fontSize: 24, // text-2xl in Tailwind
    fontWeight: "600", // font-semibold in Tailwind
    paddingVertical: 16, // py-4 in Tailwind
  },
});

export default Index;
