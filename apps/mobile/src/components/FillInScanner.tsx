import { useEffect, useState } from "react";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { Button, Text, View, StyleSheet } from "react-native";
import { encryptPasswordForFullIn } from "../utils";
import { fillInPassword } from "../client";

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
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
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
