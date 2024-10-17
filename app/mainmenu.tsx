import { View, Text, Pressable, FlatList} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../AppAuth";

export default function MainMenu() {
    const [petData, setPetData] = useState<any>([])

    const handleGoToNewAnimal = () => {
        router.push({
            pathname: "newanimal",
        });
    }

    const handlePetSelected = ({index}: any) => {
        router.push({
            pathname: "petselected",
            params: {
                name: petData[index].name,
                age: petData[index].age,
                url: petData[index].url

            }
        })
    }
    
    useEffect(() => {
        const getPetData = async () => {
            let fullData: Object[] = []
            var snapshot = await getDocs(collection(db, "pets"));
            snapshot.forEach(currentDocument => {
                fullData.push(currentDocument.data())
            })
            setPetData(fullData)
            console.log("Data obtained")
        }
        getPetData()
    }, [])
    return (
        <View className=" grow items-center bg-black">
            <View className=" pt-10">
                <Text className=" text-3xl text-white py-3">Main Menu</Text>
            </View>

            <View className="items-center">
                {petData[0] ?
                    petData.map((pet: any, index: any) => (
                        <Pressable
                            key={index}
                            onPress={() => handlePetSelected({index})}
                            className="mb-5"
                        >
                            <Text className="text-lg text-white">{pet.name}</Text>
                        </Pressable>
                    ))
                :
                    <Text className=" text-white">Waiting...</Text>
                }
            </View>

            <Pressable className="bg-stone-500 px-6 py-3 rounded-full active:bg-[#a19898] mb-6" onPress={handleGoToNewAnimal}>
                <Text className=" text-lg text-white">Add Animal</Text>
            </Pressable>
        </View>
    )
}