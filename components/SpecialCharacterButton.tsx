import { View, Button, StyleSheet } from "react-native"

type Props = {
    title: string,
    onPress: () => void
}

export default function SpecialCharacterButton(props: Props){
    return (
        <View style={{flex:1 , marginRight:10, width: 100}}>
            <Button title= {props.title} onPress={() => {
                props.onPress();
                }
            }/>
        </View>
    )
}