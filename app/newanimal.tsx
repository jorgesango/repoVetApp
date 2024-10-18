import { View, Text, Pressable, TextInput,Image, ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { db } from "../AppAuth";
import { collection, addDoc } from "firebase/firestore";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function NewAnimal() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [url, setUrl] = useState("");
    const [showForm, setShowForm] = useState(true)

    const handleGoBack = () => {
        router.push({
            pathname: "mainmenu"
        });
    }

    const handleAddAnimal = async () => {
        try {
            var petCollection = collection(db,"pets");
            if (name == "" || age == "" || url == ""){
                alert (
                    "Ups, seems you forgot to type something" 
                )
                return
            }
            setShowForm(!showForm)
            await addDoc(petCollection, {
                name: name,
                age: age,
                url: url,
            })
            setShowForm(true);
            setName("");
            setAge("");
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

    useEffect(() => {

    }, [showForm])

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
                <Text className="text-xs text-[#111111]">Here you can fill the information to add a new animal to the system.</Text>
            </View>

            {/* Main container with inputs and pressables */}
            
            <View className="w-full h-[400] border-2 border-[#00000027] shadow-3xl rounded-[50px] bg-white">

            {/* container of the inputs and forgot password */}
            { showForm ?
                <View className=" w-full px-5 items-center pt-10">

                    {/* Container of the second input (name) */}
                    <View className=" w-full">
                        <Text className=" py-2 px-4 font-semibold text-[#111111]">Pet's Name</Text>

                        {/* container exclusively for the text input */}
                        <View className=" w-full">
                            <TextInput 
                                className="bg-white text-black px-4 rounded-[20px] h-12 w-full mb-2 border-2 border-[#939393]"
                                value={name}
                                onChangeText={setName}
                                placeholder="The name of the animal"
                                secureTextEntry={false}
                            />
                        </View>
                    </View>

                    {/* Container of the first input (email) */}
                    <View className=" w-full">
                        <Text className=" py-2 px-4 font-semibold text-[#111111]">Pet's Age</Text>

                        {/* container exclusively for the text input */}
                        <View className=" w-full">
                            <TextInput 
                                className="bg-white text-black rounded-[20px] h-12 w-full px-4 mb-2 border-2 border-[#939393]"
                                value={age}
                                onChangeText={setAge}
                                placeholder="The age of the animal"
                                secureTextEntry={false}
                            />
                        </View>

                    </View>

                    {/* Container of the second input (password) */}
                    <View className=" w-full">
                        <Text className=" py-2 px-4 font-semibold text-[#111111]">Pet's Image URL</Text>

                        {/* container exclusively for the text input */}
                        <View className=" w-full">
                            <View className=" items-center justify-center flex flex-row bg-white text-black px-4 rounded-[20px] h-12 w-full mb-2 border-2 border-[#939393]">
                                <TextInput 
                                    className=" w-11/12"
                                    value={url}
                                    onChangeText={setUrl}
                                    placeholder="https//www ..."
                                    secureTextEntry={false}
                                />
                            </View>    
                        </View>
                    </View>                    

                    <View className=" w-full">
                        <Pressable className="bg-[#2545AB] items-center py-3 mx-6 mb-5 mt-3  rounded-full active:bg-[#a19898]" onPress={handleAddAnimal}>
                            <Text className=" text-sm font-bold text-white ">Add</Text>
                        </Pressable>
                    </View>
                </View>
                :
                <View className=" w-full h-full items-center justify-center">    
                    <ActivityIndicator size="large" color="#0E2366" />
                </View>
                }
            </View>
            

        </View>

    )
}