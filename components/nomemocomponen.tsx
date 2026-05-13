import { Text } from "react-native";

export const NoMemoComponent = () => {

    'use no memo';

    return (
       <Text>Will not be optimized</Text>
    )
}