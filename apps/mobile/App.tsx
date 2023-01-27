import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import AccountsScreen from "./src/components/AccountsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Passwords"
                    component={AccountsScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="ios-lock-closed" size={size} color={color} />
                        ),
                        headerLeft: () => <Text>Test</Text>,
                    }}
                />
                {/* <Tab.Screen
                    name="Cards"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="card-outline" size={size} color={color} />
                        ),
                        headerLeft: () => <Text>Test</Text>,
                    }}
                />
                <Tab.Screen
                    name="Codes"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons name="keypad" size={size} color={color} />
                        ),
                    }}
                /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
