import { View, Text, Image } from "react-native";
import { router, useLocalSearchParams, useUnstableGlobalHref } from "expo-router";

export default function PetSelected() {
    const {name, age, url} = useLocalSearchParams();
    const UrlObject = url as string;
    return (
        <View className="items-center pt-10">
            <Text>{name}</Text>
            <Text>{age}</Text>
            <Image
                source={{uri: UrlObject}}
                className="w-40 h-40 rounded-xl"
            />
        </View>
    )

}