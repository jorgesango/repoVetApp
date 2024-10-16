import { View, Text, Pressable, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../AppAuth";
import Toast from "react-native-toast-message";



export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("succesfully created user");
            router.push({
                pathname: "mainmenu",
            });
        }catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `${error.message}`,
            });
            console.log(error.message);
        }
    }

    const handleGoToLogin = () => {
        router.push({
            pathname: "index",
        });
    }


    return (
        <>
        <View className=" grow justify-center items-center bg-black">
            <View className=" w-full px-5">
                
                <TextInput 
                    className="bg-white text-black p-2 rounded-md mb-2"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    secureTextEntry={false}
                />
                <TextInput 
                    className="bg-white text-black p-2 rounded-md mb-2"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={true}
                />
            </View>

            <Pressable className="bg-stone-500 px-6 py-3 mb-12 rounded-full active:bg-[#a19898]" onPress={handleSignUp}>
                <Text className=" text-lg text-white">Sign Up</Text>
            </Pressable>

            <Pressable className=" active:bg-[#a19898]" onPress={handleGoToLogin}>
                <Text className=" text-lg text-white underline">Already have and account?</Text>
            </Pressable>
        </View>
        <Toast/>
        </>
    )
}