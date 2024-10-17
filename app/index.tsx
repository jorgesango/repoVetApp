import { View, Text, Pressable, TextInput, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../AppAuth";
import { useState } from "react";
import Toast from "react-native-toast-message";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("succesfully logged in");
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

    const handleGoToSignup = () => {
        router.push({
            pathname: "signup",
        });
    }


    return (
        <>
        <View className=" grow justify-center items-center px-10 bg-[#DAE4FE]">
            {/* Main image */}
            <View className=" w-56 h-20 mb-6">
                <Image 
                    className=" w-full h-full"
                    source={require("../assets/images/logo.png")}
                />
            </View>

            {/* Main container with inputs and pressables */}
            <View className="w-full border-2 border-[#00000027] shadow-3xl rounded-[50px] bg-white">
                
                <View className=" w-full px-5 items-center">
                    <Text className=" text-2xl py-12 font-bold">Login</Text>
                    <View>
                    <Text className=" right-16 font-semibold">E-mail Address</Text>

                    <TextInput 
                        className="bg-white text-black rounded-xl w-full mb-2 border-2 border-[#939393]"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Example@gmail.com"
                        secureTextEntry={false}
                    />
                    </View>

                    <Text className=" right-16 font-semibold">Password</Text>
                    <TextInput 
                        className="bg-white text-black py-2 px-12 rounded-xl mb-2 border-2 border-[#939393]"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••"
                        secureTextEntry={true}
                    />

                    <Pressable className=" active:bg-[#a19898]" onPress={handleGoToSignup}>
                        <Text className=" text-sm text-[black] underline pt-3 pb-7">Forgot your password?</Text>
                    </Pressable>
                </View>

                <Pressable className="bg-[#2545AB]  px-6 items-center py-3 rounded-full active:bg-[#a19898] mb-6" onPress={handleLogin}>
                    <Text className=" text-md text-white ">Continue</Text>
                </Pressable>
            </View>

            <Pressable className=" active:bg-[#a19898]" onPress={handleGoToSignup}>
                <Text className=" text-sm text-[#2545AB] underline">Sign Up</Text>
            </Pressable>
        </View>
        <View></View>
        <Toast/>
        </>
        
    )
}