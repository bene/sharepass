import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, SafeAreaView, Text } from "react-native";
import { useClientIds } from "./src/stores/client";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const { data: clientIds } = useClientIds();
    const [isSuccess, setSuccess] = React.useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        ...clientIds,
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
            setSuccess(true);
        }
    }, [response]);

    return (
        <SafeAreaView>
            <Button
                disabled={!request}
                title="Anmelden"
                onPress={() => {
                    promptAsync();
                }}
            />
            <Text>{isSuccess ? "Success" : "Fail"}</Text>
        </SafeAreaView>
    );
}
