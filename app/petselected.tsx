import { View, Text} from "react-native";
import { router, useLocalSearchParams, useUnstableGlobalHref } from "expo-router";

export default function PetSelected() {
    const {name, age, url} = useLocalSearchParams();
    const UrlObject = url as string;
    return (
        <View>
            <Text>{name}</Text>
            <Text>{age}</Text>
            {/* <img src={UrlObject}  alt="" /> */}
        </View>
    )

}