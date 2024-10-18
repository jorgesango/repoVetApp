import { Stack } from "expo-router";
export default function Route() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />
            <Stack.Screen 
                name="signup" 
                options={{
                    headerShown: false,
                    animation: "slide_from_bottom"
                }}
            />
            
            <Stack.Screen 
                name="mainmenu" 
                options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                }}
            />
            <Stack.Screen 
                name="newanimal" 
                options={{
                    headerShown: false,
                    animation: "none",
                }}
            />
            <Stack.Screen
                name="petselected"
                options={{
                    headerShown: false,
                    animation: 'fade_from_bottom'
                }
                }
            />
        </Stack>
    )
}