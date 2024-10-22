import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import { SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { verifyQR } from "@/helpers/api";
import { Toast } from "toastify-react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import Button from "./UI/Button";
import { Log } from "@/types/Logs";

const QRScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const { loading, setLoading, addLog } = useGlobalContext()!;

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setLoading(true);
    setScanned(true);
    const data_object = { id: data };
    verifyQR(data_object).then((res: Log) => {
      res.timestamp = new Date();
      addLog(res);
      if (res.success) {
        Toast.success("QR Verification Successful");
        setLoading(false);
        setStatus("Successful");
      } else {
        Toast.error("QR Verification Failed");
        setLoading(false);
        setStatus("Failed");
      }
    });
  };

  const onCameraReady = () => {
    SplashScreen.hideAsync();
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 bg-gray-800 justify-center">
        <Text className="text-center mt-5">
          Requesting camera permission...
        </Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-gray-800 justify-center">
        <Text className="text-center mt-5">No access to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      {/* Loader */}

      {loading && (
        <View
          className={`flex-1 h-full w-full justify-center items-center absolute z-30`}
        >
          <ActivityIndicator
            size="large"
            className={`text-primary text-3xl}`}
          />
        </View>
      )}

      {/* Header */}
      <View className="p-4 top-2 absolute right-auto left-auto w-full mt-2">
        <View className="text-black bg-white p-2 text-center font-DMSans z-10 mx-auto rounded-xl">
          <Text className="text-lg font-bold text-center">QR Scanner</Text>
          <Text className="text-xs">Place the QR in the frame</Text>
        </View>
      </View>

      {/* Camera */}
      <View className="flex-1">
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          className="flex-1 rounded-xl overflow-hidden"
          onCameraReady={onCameraReady}
        />
      </View>

      {/* Scan result and actions */}
      {scanned && (
        <View className="my-4 px-4">
          <Button
            onPress={() => {
              setScanned(false);
              setStatus(null);
            }}
          >
            Tap to Scan Again
          </Button>
        </View>
      )}

      {status && (
        <View className="absolute bottom-20 left-0 right-0 px-4 z-40">
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-black text-lg font-semibold">
              Status: {status}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default QRScanner;
