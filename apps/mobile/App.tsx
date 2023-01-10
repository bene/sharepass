import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, SafeAreaView, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId:
            "1092210725041-5l5hbs4ru1ob56k1bumc9akv5k4kms3f.apps.googleusercontent.com",
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <SafeAreaView>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                }}
            />
            <Text>Hallo</Text>
        </SafeAreaView>
    );
}
