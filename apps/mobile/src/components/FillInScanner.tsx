import { useEffect, useState } from "react";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { Text, View, StyleSheet } from "react-native";
import { encryptPasswordForFullIn } from "../utils";
import { fillInPassword } from "../client";
import { Ionicons } from "@expo/vector-icons";

type FillInScannerProps = {
    account: Account;
};

function FillInScanner({ account }: FillInScannerProps) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }: BarCodeEvent) => {
        setScanned(true);

        const requestId = "abc123"; // Get from scanned QR code
        const requestKey = "asasasasasasasas"; // Get from scanned QR code

        const encryptedPassword = await encryptPasswordForFullIn(
            account.password,
            requestKey
        );
        await fillInPassword(requestId, encryptedPassword);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!scanned ? (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            ) : (
                <View
                    style={{
                        backgroundColor: "#dcfce7",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 24,
                        flex: 1,
                    }}
                >
                    <Ionicons name="checkmark-circle-outline" size={64} color="#10b981" />
                    <Text
                        style={{
                            color: "#10b981",
                            fontSize: 32,
                            fontWeight: "300",
                            marginTop: 24,
                            marginBottom: 12,
                        }}
                    >
                        Password filled in.
                    </Text>

                    <Text style={{ color: "#10b981", fontSize: 16, textAlign: "center" }}>
                        The password should have been filled in on the website you scanned
                        the QR code.
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});

export default FillInScanner;
