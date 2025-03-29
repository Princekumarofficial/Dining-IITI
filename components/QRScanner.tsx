import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Camera, CameraView, BarcodeScanningResult } from "expo-camera";
import { SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { verifyQR } from "@/helpers/api";
import { Toast } from "toastify-react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { Log } from "@/types/Logs";
import Button from "@/components/UI/Button";
import Input from "./UI/Input";

const QRScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [lastLog, setLastLog] = useState<Log | null>(null);
  const [cameraType, setCameraType] = useState<"front" | "back">("back");
  const { loading, setLoading, addLog } = useGlobalContext()!;
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScanned = ({
    data,
  }: BarcodeScanningResult | { data: string }) => {
    setLoading(true);
    setScanned(true);
    const data_object = { id: data };
    verifyQR(data_object).then((res: Log) => {
      res.timestamp = new Date();
      addLog(res);
      setLastLog(res);
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

  const toggleCamera = () => {
    setCameraType((prev) => (prev == "back" ? "front" : "back"));
  };

  if (Platform.OS !== "web" && hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textCenter}>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }
  if (Platform.OS !== "web" && hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textCenter}>No access to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>QR Scanner</Text>
          <Text style={styles.headerSubtitle}>Place the QR in the frame</Text>
        </View>
      </View>

      <View style={styles.cameraContainer}>
        {Platform.OS === "web" ? (
          <View style={{ marginTop: 120, marginHorizontal: 16 }}>
            <Input
              label="Enter QR Code"
              placeholder="Enter QR Code"
              value={code || ""}
              onChangeText={(value) => setCode(value)}
              onSubmitEditing={() => {
                if (code) {
                  handleBarcodeScanned({ data: code });
                }
              }}
            />
          </View>
        ) : (
          <>
            <CameraView
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              barcodeScannerSettings={{ barcodeTypes: ["qr", "pdf417"] }}
              style={styles.camera}
              onCameraReady={onCameraReady}
              facing={cameraType}
            />
            <TouchableOpacity style={styles.fab} onPress={toggleCamera}>
              <MaterialIcons
                name="flip-camera-android"
                size={30}
                color="#ffffff"
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      {scanned && (
        <View style={styles.scanAgainContainer}>
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

      {lastLog && (
        <View>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBox,
                status === "Successful" ? styles.successBox : styles.failedBox,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  status === "Successful"
                    ? styles.successText
                    : styles.failedText,
                ]}
              >
                Status: {status} - {lastLog?.detail}
              </Text>
            </View>
            <View style={styles.studentDetailContainer}>
              <View style={styles.studentPhotoContainer}>
                <Image
                  source={{
                    uri: `${"https://diningfee.iiti.ac.in"}${
                      lastLog.mess_card.student.photo
                    }`,
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 40,
                    backgroundColor: "#e5e7eb",
                  }}
                />
              </View>
              <View style={styles.studentInfoContainer}>
                <Text style={styles.studentName}>
                  Name: {lastLog.mess_card.student.name || "N/A"}
                </Text>
                <Text style={styles.studentEmail}>
                  Email: {lastLog.mess_card.student.email || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  studentDetailContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 16,
  },
  studentPhotoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#e5e7eb",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: { color: "#6b7280", fontSize: 12 },
  studentInfoContainer: { flex: 2, paddingLeft: 16 },
  studentName: { fontSize: 16, fontWeight: "bold", color: "#1f2937" },
  studentID: { fontSize: 14, color: "#4b5563", marginTop: 4 },
  studentEmail: { fontSize: 14, color: "#4b5563", marginTop: 4 },
  container: { flex: 1, backgroundColor: "#1f2937", justifyContent: "center" },
  textCenter: { textAlign: "center", marginTop: 20, color: "#ffffff" },
  flexContainer: { flex: 1, justifyContent: "center" },
  loaderContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 30,
  },
  headerContainer: { padding: 16, position: "absolute", top: 8, width: "100%" },
  header: {
    backgroundColor: "#ffffff",
    padding: 8,
    alignItems: "center",
    borderRadius: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  headerSubtitle: { fontSize: 12, textAlign: "center" },
  cameraContainer: { flex: 1 },
  camera: { flex: 1, borderRadius: 12, overflow: "hidden" },
  fab: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#1f2937",
    padding: 12,
    borderRadius: 30,
  },
  scanAgainContainer: { marginVertical: 16, paddingHorizontal: 16 },
  statusContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 40,
  },
  statusBox: { backgroundColor: "#ffffff", padding: 16, borderRadius: 12 },
  successBox: { backgroundColor: "#d1fae5" },
  failedBox: { backgroundColor: "#fee2e2" },
  statusText: { fontSize: 18, fontWeight: "600" },
  successText: { color: "#047857" },
  failedText: { color: "#b91c1c" },
});

export default QRScanner;
