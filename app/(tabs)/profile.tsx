import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { styled } from "nativewind";
import { logout } from "@/helpers/auth";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { formatDateTime } from "@/utils/datetime";
import { DestructiveButton } from "@/components/UI/Button";
import Toast from "toastify-react-native";

const StyledText = styled(Text);

const Profile = () => {
  const globalContext = useGlobalContext()!;
  const { user, setUser, loading, setLoading, setLoggedIn } = globalContext;

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            setLoading(true);
            const res = await logout();
            if (res) {
              setLoggedIn(false);
              setUser(null);
              Toast.success("Logged Out successfully");
              router.push("/");
            } else {
              Toast.error("Failed to logout");
            }
            setLoading(false);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <View className="items-center bg-white shadow-md rounded-b-3xl pb-8">
        <Image
          source={require("@/app/assets/images/iiti-logo.png")}
          className="w-32 h-32 rounded-full mt-10"
        />
        <StyledText className="font-bold text-2xl mt-4">
          {user?.username}
        </StyledText>
        <StyledText className="text-gray-500 text-lg">{user?.email}</StyledText>
      </View>

      {/* Profile Details */}
      <View className="flex-1 px-6 mt-8">
        <View className="mb-4">
          <Text className="text-lg font-semibold">Profile Information</Text>
          <View className="bg-white p-4 mt-2 rounded-lg shadow-md">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-600">Name</Text>
              <Text className="font-semibold">
                {user?.first_name && user?.first_name}{" "}
                {user?.last_name && user?.last_name}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-600">Last Logged In</Text>
              <Text className="font-semibold">
                {user?.last_login && formatDateTime(user?.last_login!)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-600">Email</Text>
              <Text className="font-semibold">{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <DestructiveButton onPress={handleLogout} isLoading={loading}>
          <FontAwesome name="sign-out" size={20} color="white" />
          <Text className="text-white text-lg font-bold ml-2"> Logout</Text>
        </DestructiveButton>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
