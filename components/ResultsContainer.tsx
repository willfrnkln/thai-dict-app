import { View, Text} from "react-native";
import { EntryType }from '@/components/Entry'
import Entry from "@/components/Entry";


type Props = {
    results: [EntryType]
}

export default function ResultsContainer({results}: Props) {
    const firstTen = results.length > 10 ? results.slice(0,10) : results;
    var tenRes = firstTen.map(element => {
                return Entry(element)
            });

    return (
        <View >
            <Text style={{fontSize: 40}}>Results:</Text>
             { tenRes }
        </View>
    )
}