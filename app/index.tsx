import { View, Text, Pressable, TextInput, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../AppAuth";
import { useState } from "react";
import Toast from "react-native-toast-message";



export default function Login() {
    const [email, setEmail] = useState("jorge@gmail.com");
    const [password, setPassword] = useState("123456");

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
                
                {/* container of the inputs and forgot password */}
                <View className=" w-full px-5 items-center">
                    <Text className=" text-2xl py-12 font-bold">Login</Text>

                    {/* Container of the first input (email) */}
                    <View className=" w-full">
                        <Text className=" py-2 px-4 font-semibold text-[#111111]">E-mail Address</Text>

                        {/* container exclusively for the text input */}
                        <View className=" w-full">
                            <TextInput 
                                className="bg-white text-black rounded-[20px] h-12 w-full px-4 mb-2 border-2 border-[#939393]"
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Example@gmail.com"
                                secureTextEntry={false}
                            />
                        </View>

                    </View>

                    {/* Container of the second input (password) */}
                    <View className=" w-full">
                        <Text className=" py-2 px-4 font-semibold text-[#111111]">Password</Text>

                        {/* container exclusively for the text input */}
                        <View className=" w-full">
                            <TextInput 
                                className="bg-white text-black px-4 rounded-[20px] h-12 w-full mb-2 border-2 border-[#939393]"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>

                    {/* container for the message */}
                    <View className=" w-full items-center">
                        <Pressable className=" pt-2 pb-10">
                            <Text className=" text-xs text-[black] underline">Forgot your password?</Text>
                        </Pressable>
                    </View>

                    <View className=" w-full">
                        <Pressable className="bg-[#2545AB] items-center py-3 mx-6 mb-7  rounded-full active:bg-[#a19898]" onPress={handleLogin}>
                            <Text className=" text-sm text-white ">Continue</Text>
                        </Pressable>
                    </View>


                </View>
            </View>
            <View className=" w-full items-center mb-12"></View>
            <View className=" w-full items-center">
                <View className=" w-full items-center">
                    <Pressable className=" active:bg-[#a19898]" onPress={handleGoToSignup}>
                        <Text className=" text-sm text-[#2545AB] underline">Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        <Toast/>
        </>
        
    )
}