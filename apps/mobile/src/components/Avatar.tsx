import { Text, View } from "react-native";

export type AvatarProps = {
    letter: string;
    color: string;
};

function Avatar({ letter, color }: AvatarProps) {
    return (
        <View
            style={{
                height: 36,
                width: 36,
                borderRadius: 28,
                backgroundColor: color,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "#fff", fontSize: 18 }}>{letter}</Text>
        </View>
    );
}

export default Avatar;
