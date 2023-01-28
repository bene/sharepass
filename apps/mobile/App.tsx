import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountsScreen from "./src/components/AccountsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Group>
                        <Tab.Screen
                            name="Passwords"
                            component={AccountsScreen}
                            options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                    <Ionicons
                                        name="ios-lock-closed"
                                        size={size}
                                        color={color}
                                    />
                                ),
                                headerLeft: () => (
                                    <Ionicons
                                        name="ios-camera-outline"
                                        color="#c026d3"
                                        size={28}
                                        style={{ paddingStart: 18 }}
                                    />
                                ),
                                headerRight: () => (
                                    <Ionicons
                                        name="ios-add"
                                        color="#c026d3"
                                        size={28}
                                        style={{ paddingEnd: 18 }}
                                    />
                                ),
                                tabBarActiveTintColor: "#c026d3",
                            }}
                        />
                        <Tab.Screen
                            name="Cards"
                            component={AccountsScreen}
                            options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                    <Ionicons
                                        name="card-outline"
                                        size={size}
                                        color={color}
                                    />
                                ),
                                tabBarActiveTintColor: "#c026d3",
                            }}
                        />
                    </Tab.Group>

                    {/* <Tab.Group screenOptions={{ presentation: "modal" }}>
                        <Tab.Screen name="New password" component={AccountsScreen} />
                    </Tab.Group> */}
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}
