import { View, Text, Pressable, FlatList, Dimensions } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../AppAuth";

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
        <View className="grow items-center px-10 bg-black">
            <View className="pt-10">
                <Text className="text-3xl text-white py-3">Main Menu</Text>
            </View>

            <View
                className="w-full rounded-2xl mb-5 bg-[#3b3b3b]"
                style={{ height: windowHeight - 200 }}
            >
                <FlatList
                    data={petData}
                    keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
                    renderItem={({ item, index }) => (
                        <Pressable
                            onPress={() => handlePetSelected({ index })}
                            className="mb-5"
                        >
                            <Text className="text-lg text-white">{item.name}</Text>
                        </Pressable>
                    )}
                    ListEmptyComponent={<Text className="text-white">Waiting...</Text>} // Texto por si no hay datos
                    contentContainerStyle={{ alignItems: "center" }} // Alineamos el contenido al centro
                />
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