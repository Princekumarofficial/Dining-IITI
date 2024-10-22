import { ScrollView, View, Text, Image } from "react-native";
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
    <SafeAreaView className="flex-1 bg-gray-100 mt-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-8">
        <View className="flex items-center">
          <Image
            source={require("@/app/assets/images/iiti-logo.png")}
            className="w-32 h-36 mb-8"
          />
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Log in to Dining IITI
          </Text>

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

export default SignIn;
