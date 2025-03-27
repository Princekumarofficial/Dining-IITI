import { FlatList, Text, View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";

const Logs = () => {
  const { logs } = useGlobalContext()!;
  return (
    <SafeAreaView>
      <FlatList
        data={logs.reverse()}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.logItem,
              item.success ? styles.successBackground : styles.failedBackground,
            ]}
          >
            <View style={styles.row}>
              <Text style={styles.nameText}>
                Name: {item.mess_card.student.name}
              </Text>
              <Text style={styles.nameText}>
                {item.mess_card.allocation.caterer.name} -{" "}
                {item.mess_card.allocation.student_id}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.timestampText}>
                {item.timestamp!.toLocaleString()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[
                  styles.statusText,
                  item.success ? styles.successText : styles.failedText,
                ]}
              >
                {item.success ? "Success" : "Failed"}
                {" - "}
              </Text>
              <Text>{item.detail}</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Logs</Text>
            <Text style={styles.headerSubtitle}>
              Logs will be deleted after App restarts!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logItem: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#D1D5DB", // Replace with your quaternary color
    margin: 16,
  },
  successBackground: {
    backgroundColor: "#ECFDF5", // Replace with your green-50 color
  },
  failedBackground: {
    backgroundColor: "#FEF2F2", // Replace with your red-50 color
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  nameText: {
    fontWeight: "600",
    fontSize: 18,
  },
  timestampText: {
    color: "#1F2937", // Replace with your primary color
  },
  statusText: {
    fontWeight: "600",
  },
  successText: {
    color: "#16A34A", // Replace with your green-600 color
  },
  failedText: {
    color: "#DC2626", // Replace with your red-600 color
  },
  header: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#4B5563", // Replace with your secondary color
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "DMSans-Bold", // Replace with your font-DMSans
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#FFFFFF",
  },
});

export default Logs;
