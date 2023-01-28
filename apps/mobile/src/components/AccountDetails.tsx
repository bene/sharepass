import { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";

import FillInScanner from "./FillInScanner";
import AvatarGroup from "./AvatarGroup";

type PasswordViewProps = {
    account: Account;
};

function AccountDetails({ account }: PasswordViewProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ padding: 24, flex: 1 }}>
            <View
                style={{
                    overflow: "hidden",
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: 12,
                    marginBottom: 12,
                }}
            >
                <FillInScanner account={account} />
            </View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#eee",
                    paddingVertical: 24,
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
                    }}
                >
                    <Image
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 8,
                        }}
                        source={{
                            uri: `https://logo.clearbit.com/${account.url}`,
                        }}
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                        {account.name}
                    </Text>
                    <Text style={{ fontSize: 22, fontWeight: "300" }}>
                        {account.username}
                    </Text>
                </View>

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

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eee",
                    borderRadius: 12,
                    marginBottom: 12,
                    paddingVertical: 24,
                }}
            >
                <AvatarGroup
                    avatars={[
                        {
                            letter: "B",
                            color: "#ea580c",
                        },
                        {
                            letter: "E",
                            color: "#0284c7",
                        },
                        {
                            letter: "D",
                            color: "#059669",
                        },
                    ]}
                />
            </View>
        </View>
    );
}

export default AccountDetails;
