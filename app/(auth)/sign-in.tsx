import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { login } from "@/helpers/auth";
import Toast from "toastify-react-native";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome } from "@expo/vector-icons";

interface FormState {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const { loading, setLoading, updateAuth } = useGlobalContext()!;

  const handleInputChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignIn = async () => {
    setLoading(true);
    const res = await login(form.email, form.password);
    if (res) {
      Toast.success("Logged in successfully");
      updateAuth();
      router.push("/home");
    } else {
      Toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Image
            source={require("@/app/assets/images/iiti-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Log in to Dining IITI</Text>

          <Input
            label="Email"
            value={form.email}
            onChangeText={(value: string) => handleInputChange("email", value)}
            placeholder="Enter your email/username"
          />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value: string) =>
              handleInputChange("password", value)
            }
            placeholder="Enter your password"
            secureTextEntry
          />

          <Button onPress={handleSignIn} isLoading={loading}>
            <FontAwesome name="sign-in" size={20} color="white" />
            {"  "}
            Sign In
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // gray-100
    marginTop: 16, // mt-4
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16, // px-4
    paddingVertical: 32, // py-8
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 128, // w-32
    height: 144, // h-36
    marginBottom: 32, // mb-8
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: "bold",
    color: "#1f2937", // text-gray-800
    marginBottom: 24, // mb-6
  },
});

export default SignIn;
