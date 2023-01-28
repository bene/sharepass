import { View } from "react-native";

import Avatar, { AvatarProps } from "./Avatar";

type AvatarGroupProps = {
    avatars: AvatarProps[];
};

function AvatarGroup({ avatars }: AvatarGroupProps) {
    const avatarsView = avatars.map((avatar, idx) => (
        <View key={idx.toString()} style={{ marginStart: idx !== 0 ? -8 : 0 }}>
            <Avatar letter={avatar.letter} color={avatar.color} />
        </View>
    ));

    return <View style={{ flexDirection: "row" }}>{avatarsView}</View>;
}

export default AvatarGroup;
