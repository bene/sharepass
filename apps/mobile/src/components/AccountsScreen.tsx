import { useState } from "react";
import { ScrollView, Text, Image, View, Pressable, Modal } from "react-native";

import AccountDetails from "./AccountDetails";
import AvatarGroup from "./AvatarGroup";

const accounts = [
    {
        id: "1",
        name: "Apple",
        username: "bene",
        password: "1234",
        url: "https://www.apple.com/",
    },
    {
        id: "2",
        name: "Tesla",
        username: "benno",
        password: "1234",
        url: "https://www.tesla.com",
    },
    {
        id: "3",
        name: "Google",
        username: "benedict",
        password: "1234",
        url: "https://www.google.com/",
    },
];

function AccountsScreen() {
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    const passwordViews = accounts.map((account, idx) => {
        return (
            <Pressable
                key={account.id}
                onPress={() => setSelectedAccount(account)}
                style={{
                    padding: 12,
                    marginHorizontal: 12,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopStartRadius: idx === 0 ? 8 : 0,
                    borderTopEndRadius: idx === 0 ? 8 : 0,
                    borderBottomStartRadius: idx === accounts.length - 1 ? 8 : 0,
                    borderBottomEndRadius: idx === accounts.length - 1 ? 8 : 0,
                    borderTopWidth: idx !== 0 ? 1 : 0,
                    borderColor: "#eee",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{ width: 50, height: 50, marginEnd: 12, borderRadius: 8 }}
                        source={{
                            uri: `https://logo.clearbit.com/${account.url}`,
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "column",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {account.name}
                        </Text>
                        <Text style={{ fontSize: 18 }}>{account.username}</Text>
                    </View>
                </View>

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
            </Pressable>
        );
    });

    return (
        <>
            <ScrollView style={{ borderRadius: 16, paddingTop: 12 }}>
                {passwordViews}
            </ScrollView>

            <Modal
                animationType="slide"
                presentationStyle="pageSheet"
                visible={selectedAccount !== null}
                onRequestClose={() => setSelectedAccount(null)}
            >
                {selectedAccount && <AccountDetails account={selectedAccount} />}
            </Modal>
        </>
    );
}

export default AccountsScreen;
