import { View, Text, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";

interface InputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-1">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={secureTextEntry}
        className={`w-full p-3 rounded-lg bg-white border-2 ${
          isFocused ? "border-blue-500" : "border-gray-300"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
};

export default Input;
