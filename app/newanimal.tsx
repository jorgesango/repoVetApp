import { View, Text, Pressable, TextInput, } from "react-native";
import { useState, } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { db } from "../AppAuth";
import { collection, addDoc } from "firebase/firestore";


export default function NewAnimal() {
    const [name, setName] = useState("");
    const [age, setage] = useState("");
    const [url, setUrl] = useState("");

    const handleAddAnimal = async () => {
        try {
            var petCollection = collection(db,"pets");
            if (name == "" || age == "" || url == ""){
                alert (
                    "Ups, seems you forgot to type something" 
                )
                return
            }
            await addDoc(petCollection, {
                name: name,
                age: age,
                url: url,
            })
            console.log("Animal Added");
            setName("");
            setage("");
            setUrl("");
        }catch (error: any) {
            console.log(error.message);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `${error.message}`,
            });
        }
    }

    const handleGoToMainmenu = () => {
        router.push({
            pathname: "mainmenu",
        })
    }


    return (
        <View className=" grow pt-40 items-center bg-black">
            <Text className=" text-lg text-white">New Animal</Text>
            <View className=" justify-center w-full px-5">
                <TextInput 
                        className="bg-white text-black p-2 rounded-md mb-2"
                        value={name}
                        onChangeText={setName}
                        placeholder="Pet's Name"
                        secureTextEntry={false}
                    />
                    <TextInput 
                        className="bg-white text-black p-2 rounded-md mb-2"
                        value={age}
                        onChangeText={setage}
                        placeholder="Pet's Age"
                        secureTextEntry={false}
                    />
                    <TextInput 
                        className="bg-white text-black p-2 rounded-md mb-2"
                        value={url}
                        onChangeText={setUrl}
                        placeholder="Pet's Image URL"
                        secureTextEntry={false}
                    />
                </View>
                <Pressable className="bg-stone-500 px-6 py-3 rounded-full active:bg-[#a19898] mb-6" onPress={handleAddAnimal}>
                        <Text className=" text-lg text-white">Add Pet</Text>
                </Pressable>
                <Pressable className=" active:bg-[#a19898]" onPress={handleGoToMainmenu}>
                    <Text className=" text-lg text-white underline">Return to Main Menu</Text>
                </Pressable>
        </View>

    )
}