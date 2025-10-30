import { useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Button, FocusEvent, ScrollView, StatusBar } from "react-native";
import ResultsContainer from "@/components/ResultsContainer";
import {EntryType} from "@/components/Entry";
import {getMatches, rankSimilarity} from '@/assets/util/regex';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SpecialCharacterButton from "@/components/SpecialCharacterButton";

const dictionary = require('@/assets/dictionary/dictionary.json');


export default function Index() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dictionary)
  const inputRef = useRef(null);

  const getMatchingEntries = (query: String) => {
    var res = Array(0);
    /*dictionary.forEach( (entry: Entry) => {
      if(entry['pronunciation-search'] === query)
        res.push(entry);
    });
  setResults(res)*/
  res = getMatches(query);
  res.forEach( (element: EntryType) => element.similarity = rankSimilarity(element["pronunciation-search"], query) )
  res.sort((a: EntryType, b: EntryType) => {return b.similarity - a.similarity})
  setResults(res);
}

  const addSpecialCharacter = (char: String) => {
    setQuery(query+char);
  }

  
  return (
    <ScrollView
      style={styles.scrollViewStyle}
    >
      <View style= {styles.centerView}>
        <View style= {styles.horizontal}>
          <TextInput style={styles.searchbar} value={query} 
            onChangeText={(newText) => {
                setQuery(newText) 
              }
            }
            onSubmitEditing={ ()=> getMatchingEntries(query)}
         />
         <Button  title= 'Search' onPress={ () => { getMatchingEntries(query)} }/>
      </View>
         <View style = {styles.buttonView}>
          Special Vowels:
          <SpecialCharacterButton title={'ᴐ  (-อ)'} onPress={() => addSpecialCharacter('ᴐ')}/>     
          <SpecialCharacterButton title={'ɯ  (-อึ)'} onPress={() => addSpecialCharacter('ɯ')}/>
          <SpecialCharacterButton title={'ɤ  (เ-อ)'} onPress={() => addSpecialCharacter('ɤ')}/>            
          <SpecialCharacterButton title={'ɛ  (แอ)'} onPress={() => addSpecialCharacter('ɛ')}/>
          
        </View>
        <br/>
        
      <View style={styles.resultsContainer}>
        <ResultsContainer results={results}>
        </ResultsContainer>
      </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',},
  searchbarView: {
    backgroundColor: '#483131ff',
  },
  searchbar: {
    backgroundColor: '#fff',
    borderWidth: 3,
    padding: 10,
    height: 60,
    flex: 1,
    fontSize: 40,
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  buttonView: {
    marginHorizontal: 6,
    padding: 3,
    backgroundColor: '#8ab18fff',
    borderColor: '#fff',
    flexDirection: 'row'
  },
  specialCharacterButton: {
    
  },
  resultsContainer: {
    backgroundColor:'#84b78bff',
    width: '66%',
    padding: 5
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