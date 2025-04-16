import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

interface InputProps extends TextInputProps {
  label: string;
  shouldRefocus?: boolean;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  shouldRefocus,
  onSubmitEditing,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [refocusTrigger, setRefocusTrigger] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if ((shouldRefocus || refocusTrigger) && inputRef.current) {
      inputRef.current.focus();
      setRefocusTrigger(false);
    }
  }, [shouldRefocus, refocusTrigger]);

  const handleSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (onSubmitEditing) {
      onSubmitEditing(e);
    }
    setRefocusTrigger(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          isFocused ? styles.inputFocused : styles.inputBlurred,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSubmitEditing}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
  },
  inputFocused: {
    borderColor: "#3B82F6",
  },
  inputBlurred: {
    borderColor: "#D1D5DB",
  },
});

export default Input;
