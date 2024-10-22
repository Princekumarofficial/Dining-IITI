import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onPress: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-green-600 py-3 px-6 rounded-lg mt-6 w-full flex items-center ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white text-lg font-semibold">{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export const DestructiveButton: React.FC<ButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-red-600 py-3 px-6 rounded-lg mt-6 w-full flex items-center"
    >
      <Text className="text-white text-lg font-semibold">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
