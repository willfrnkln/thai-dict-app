import { View, Text, StyleSheet } from "react-native"

export type EntryType = {
        "id": String,
        "t-search": String,
        "t-entry": String,
        "e-entry": String,
        "t-cat": String,
        "t-syn": String,
        "t-sample": String,
        "t-ant": String,
        "t-def": String,
        "e-related": String,
        "t-num": String,
        "notes": String,
        "pronunciation": String,
        "pronunciation-search": String,
        "similarity": number   
}

export default function Entry(entry: EntryType){
        return (
                <>
                <View style={styles.container}>
                  <View style={styles.horizontal}>
                        <View style={styles.vertical}>
                          <Text style={styles.text}>{entry['t-entry']}</Text>
                          <Text style={{fontSize: 20}}>{' (' + entry.pronunciation + ') '}</Text>
                          <Text style={{fontSize: 20}}>{' (' + entry["pronunciation-search"] + ') '}</Text>
                        </View>
                        <View style={styles.vertical}>
                          <Text style={styles.text}>{entry['e-entry']}</Text>
                          <Text style={{fontSize: 15}}>{entry['t-cat'] + '.'}</Text>
                          <Text style={{fontSize: 15}}>{entry.similarity}</Text>
                        </View>
                  </View>
                  <br/>
                </View>
                <br/>
                </>
        )
}

const styles = StyleSheet.create({
        text: {fontSize: 30,
                flex: 1,
        },
        container: {
                flex: 1,
                backgroundColor: '#a7b8d1ff',
                padding: 5,
                borderColor: '#000',
                borderWidth: 3,
                
        },
        horizontal:{
                flexDirection: 'row',
                flex: 1,
                padding: 5
        },
        vertical:{
                flexDirection: 'column',
                flex: 1
        },


})