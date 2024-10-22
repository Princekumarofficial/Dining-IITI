import { FlatList, Text, View } from "react-native";
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
            className={`p-4 border-2 rounded-xl border-quaternary m-4 ${
              item.success ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <View className="flex justify-between flex-row basis-auto">
              <Text className="font-semibold text-lg">
                Name: {item.mess_card.student.name}
              </Text>
              <Text className="font-semibold text-lg">
                {item.mess_card.allocation.caterer.name} -{" "}
                {item.mess_card.allocation.student_id}
              </Text>
            </View>
            <View className="flex justify-between flex-row basis-auto">
              <Text className="text-primary">
                {item.timestamp!.toLocaleString()}
              </Text>
            </View>
            <View className="flex flex-row basis-auto">
              <Text
                className={`${
                  item.success ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {item.success ? "Success" : "Failed"}
                {" - "}
              </Text>
              <Text>{item.detail}</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View className="w-full flex items-center py-4 bg-secondary">
            <Text className="text-2xl font-DMSans font-bold text-white">
              Logs
            </Text>
            <Text className="text-white text-xs">
              Logs will be deleted after App restarts!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Logs;
