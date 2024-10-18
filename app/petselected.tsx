import { View, Text, Image, Pressable } from "react-native";
import { router, useLocalSearchParams, useUnstableGlobalHref } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function PetSelected() {
    const {name, age, url} = useLocalSearchParams();
    const UrlObject = url as string;

    const handleGoBack = () => {
        router.back()
    }

    return (
        <View className="grow flex flex-col items-center px-10 pt-12 bg-[#DAE4FE]">
            
             <View className="w-full flex flex-row mb-12">
                <View className="w-5/6">
                    <View  className="w-28 h-10">
                        <Image 
                            className=" w-full h-full"
                            source={require("../assets/images/logo.png")}
                        />
                    </View>
                </View>

                <View className=" w-1/6">
                    <View  className="w-10 h-10">
                        <Image 
                            className=" w-full h-full"
                            source={require("../assets/images/profile.png")}
                        />
                    </View>
                </View>
            </View>

            <View className=" flex flex-row justify-start w-full items-center">
                <Pressable className=" active:bg-[#00000015] flex flex-row justify-start w-3/12 items-center" onPress={handleGoBack}>
                    <AntDesign name="arrowleft" size={16} color="#0E2366" />
                    <Text className=" text-sm text-[#0E2366] underline">Return</Text>
                </Pressable>
            </View>

            <View className="w-full items-start pt-8 pb-6">
                <Text className="text-3xl font-bold text-[#111111] py-3">Animal Detail</Text>
                <Text className="text-xs text-[#111111]">Here you can see the information of the animal that is in the system.</Text>
            </View>

            <View className=" w-full h-[360px] items-center pt-5 border-2 px-5 bg-white border-[#00000027] shadow-3xl rounded-[50px]">
                <Image
                    source={{uri: UrlObject}}
                    className="w-full h-60 rounded-[30px] "
                />

                <View className=" w-full items-center justify-center pt-2">
                    <Text className=" text-2xl font-bold text-[#0E2366]">{name[0].toUpperCase() + name.slice(1)}</Text>
                    <Text className=" text-[#5C6885]">{`Age: ${age} years old `}</Text>
                </View>
            </View>
        </View>
    )

}