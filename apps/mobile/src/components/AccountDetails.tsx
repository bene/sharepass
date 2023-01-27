import { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";

import FillInScanner from "./FillInScanner";

type PasswordViewProps = {
    account: Account;
};

function AccountDetails({ account }: PasswordViewProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ padding: 24, flex: 1 }}>
            <View
                style={{
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: 24,
                }}
            >
                <FillInScanner account={account} />
            </View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eee",
                    borderRadius: 12,
                    marginBottom: 12,
                    flex: 1,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        padding: 8,
                        borderRadius: 8,
                        marginBottom: 24,
                    }}
                >
                    <Image
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 8,
                        }}
                        source={{
                            uri: `https://logo.clearbit.com/${account.url}`,
                        }}
                    />
                </View>

                <Text style={{ fontSize: 36, fontWeight: "bold" }}>{account.name}</Text>
                <Text style={{ fontSize: 24, marginBottom: 28 }}>{account.username}</Text>

                {showPassword ? (
                    <Pressable onLongPress={() => Clipboard.setStringAsync("password")}>
                        <View
                            style={{
                                backgroundColor: "#eee",
                                padding: 12,
                                borderRadius: 8,
                            }}
                        >
                            <Text>{account.password}</Text>
                        </View>
                    </Pressable>
                ) : (
                    <Button title="Show password" onPress={() => setShowPassword(true)} />
                )}
            </View>
        </View>
    );
}

export default AccountDetails;
