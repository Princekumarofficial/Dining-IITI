import React from "react";
import { View, Text, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { logout } from "@/helpers/auth";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { formatDateTime } from "@/utils/datetime";
import { DestructiveButton } from "@/components/UI/Button";
import Toast from "toastify-react-native";

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
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require("@/app/assets/images/iiti-logo.png")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>
                {user?.first_name && user?.first_name}{" "}
                {user?.last_name && user?.last_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Logged In</Text>
              <Text style={styles.infoValue}>
                {user?.last_login && formatDateTime(user?.last_login!)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <DestructiveButton onPress={handleLogout} isLoading={loading}>
          <FontAwesome name="sign-out" size={20} color="white" />
          <Text style={styles.logoutText}> Logout</Text>
        </DestructiveButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 16,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginTop: 40,
  },
  username: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 16,
  },
  email: {
    color: "#6b7280",
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    color: "#6b7280",
  },
  infoValue: {
    fontWeight: "600",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default Profile;
