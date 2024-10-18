import { View, Text, Pressable, FlatList, Dimensions, Image, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../AppAuth";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


const windowHeight = Dimensions.get('window').height;

export default function MainMenu() {
    const [petData, setPetData] = useState<any>([]);

    const handleGoToNewAnimal = () => {
        router.push({
            pathname: "newanimal",
        });
    };

    const handlePetSelected = ({ index }: any) => {
        router.push({
            pathname: "petselected",
            params: {
                name: petData[index].name,
                age: petData[index].age,
                url: petData[index].url,
            },
        });
    };


    useEffect(() => {
        const getPetData = async () => {
            let fullData: Object[] = [];
            var snapshot = await getDocs(collection(db, "pets"));
            snapshot.forEach((currentDocument) => {
                fullData.push(currentDocument.data());
            });
            setPetData(fullData);
            console.log("Data obtained");
        };
        getPetData();
    }, []);

    return (
        // background with all the divisions
        <View className="grow flex flex-col px-10 pt-12 bg-[#DAE4FE]">

            <View className=" items-end border-2 rounded-full border-[#00000027] shadow-3xl justify-end absolute z-10 right-6 top-[60%]">
                <Pressable onPress={handleGoToNewAnimal}>
                    <AntDesign name="pluscircle" size={70} color="#0E2366" />
                </Pressable>
            </View>

            <View className="w-full flex flex-row">
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
            
            {/* View of main menu text with description */}
            <View className="w-full items-start pt-8 pb-6">
                <Text className="text-3xl font-bold text-[#111111] py-3">Main Menu</Text>
                <Text className="text-xs font-bold text-[#111111]">Here you can find all the animals you have registered and add new animals to the system</Text>
            </View>
            <View className="w-full h-full border-2 border-[#00000027] shadow-3xl items-center rounded-t-[50px] bg-[#FFFFFF]" >
                <View className=" items-center w-full py-3 border-b-[1px] border-[#0E2366]">
                    <Text className=" font-medium text-base text-[#0E2366]"> Animals </Text>
                </View>

                <View
                    className={"w-full h-[550] bg-[#FFFFFF] px-7"}
                >
                    <FlatList
                        className=" w-full mt-3"
                        data={petData}
                        keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
                        renderItem={({ item, index }) => (  
                                <Pressable
                                    onPress={() => handlePetSelected({ index })}
                                    className=" flex flex-row w-full justify-between my-2 px-4 rounded-2xl py-3 bg-[#ECF0FF]"
                                >
                                    <Text className=" text-base font-medium text-[#0E2366]">{item.name[0].toUpperCase() + item.name.slice(1)}</Text>
                                    <View className="">
                                        <FontAwesome name="arrow-circle-right" className="" size={24} color="#0E2366" />
                                    </View>
                                </Pressable>
                        )}
                        ListEmptyComponent={
                        <View className=" w-full h-full items-center justify-center">    
                            <ActivityIndicator size="large" color="#0E2366" />
                        </View>} // Texto por si no hay datos
                    />
                </View>
            </View>
            <Pressable
                className="bg-stone-500 px-6 py-3 rounded-full active:bg-[#a19898] mb-6"
                onPress={handleGoToNewAnimal}
            >
                <Text className="text-lg text-white">Add Animal</Text>
            </Pressable>
        </View>
    );
}