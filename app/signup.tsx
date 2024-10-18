import { View, Text, Pressable, TextInput, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../AppAuth";
import Toast from "react-native-toast-message";



export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

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
            pathname: "/",
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
                    <Text className=" text-2xl pt-10 pb-4 font-bold">Sign Up</Text>

                    {/* Container of the second input (name) */}
                    <View className=" w-full">
                        <Text className=" py-2 px-4 font-semibold text-[#111111]">Name</Text>

                        {/* container exclusively for the text input */}
                        <View className=" w-full">
                            <TextInput 
                                className="bg-white text-black px-4 rounded-[20px] h-12 w-full mb-2 border-2 border-[#939393]"
                                value={name}
                                onChangeText={setName}
                                placeholder="Your name goes here"
                                secureTextEntry={false}
                            />
                        </View>
                    </View>

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
                                className="bg-white text-black px-4 rounded-[20px] h-12 w-full border-2 border-[#939393]"
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>                    

                    <View className=" w-full">
                        <Pressable className="bg-[#2545AB] items-center py-3 mx-6 my-9  rounded-full active:bg-[#a19898]" onPress={handleSignUp}>
                            <Text className=" text-sm text-white ">Continue</Text>
                        </Pressable>
                    </View>


                </View>
            </View>
            <View className=" w-full items-center mb-12"></View>
            <View className=" w-full items-center">
                <View className=" w-full items-center">
                    <Pressable className=" active:bg-[#a19898]" onPress={handleGoToLogin}>
                        <Text className=" text-sm text-[#2545AB] underline">Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        <Toast/>
        </>
    )
}