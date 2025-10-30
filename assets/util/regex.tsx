import { EntryType } from "@/components/Entry";

var dict = require('@/assets/dictionary/dictionary.json')
var levenshtein = require('fast-levenshtein');
  

const initialRegex = Object.entries({
    'k'   : 'k(k)?(ʰ)?(l|r)?',
    'kr'  : 'k(ʰ)?(l|r)',
    'kl'  : 'k(ʰ)?(l|r)?',
    'kh'  : 'kʰ(l|r)?', 
    'khr' : 'kʰ(l|r)',
    't'   : 't(ʰ)?(l|r)?',
    'tr'  : 't(ʰ)?(l|r)',
    'th'  : 'tʰ(l|r)?', 
    'thr' : 't(ʰ)?(l|r)?',
    'd'   : 'd(ʰ)?(l|r)?',
    'p'   : 'p(ʰ)?(l|r)?',
    'pr'  : 'p(ʰ)?(l|r)',
    'ph'  : 'pʰ(l|r)?', 
    'phr' : 'pʰ(l|r)',
    'pl'  : 'p(ʰ)?(l|r)',
    'phl' : 'pʰ(l|r)',
    'b'   : 'b(l|r)?',
    'f'   : 'f(l|r)?',
    'fr'  : 'f(l|r)?',
    'fl'  : 'f(l|r)?',
    'n'   : 'n',
    'm'   : 'm', 
    'ng'  : 'ŋ', 
    'c'   : 'c(ʰ)?', 
    'ch'  : 'cʰ', 
    'j'   : 'c(ʰ)?',
    'y'   : 'j', 
    'w'   : 'w',
    'l'   : '(l|r)', 
    'r'   : '(l|r)',
    'h'   : '(h|kʰ)',
    's'   : 's'
}).sort((a, b) => b[0].length - a[0].length)


const vowelRegex = Object.entries({
    'a'  : 'a{1,2}',
    'aa' : 'aa', 
    'ai' : 'a{1,2}j', 
    'ay' : 'a{1,2}j', 
    'ao' : 'a{1,2}w', 
    'aw' : 'a{1,2}w', 
    'aai': 'aaj', 
    'aay': 'aaj', 
    'aao': 'aaw', 
    'aaw': 'aaw',
    'e'  : '(e|ɛ){1,2}',
    'ee'  : '(ee|ɛɛ)',
    'i'  : 'i{1,2}',
    'ii'  : 'ii',
    'ia' : 'ia',
    'iaw': 'iaw',
    'o'  : '(o|ᴐ){1,2}', 
    'oo'  : '(oo|ᴐᴐ|u|uu)', 
    'u'  : '(u|ɯ|ɤ){1,2}',
    'uu'  : '(uu|ɯɯ|ɤɤ)',
    'ui'  : '(u|ɯ)aj',
    'uy'  : '(u|ɯ)aj',
    'ᴐ'  : '(o|ᴐ){1,2}', 
    'ᴐᴐ'  : '(oo|ᴐᴐ)', 
    'ɯ'  : 'ɯ{1,2}',
    'ɯɯ'  : '(ɯɯ)',
    'ɯi'  : '(u|ɯ)aj',
    'ɯy'  : '(u|ɯ)aj',
    'ɤ'   : 'ɤ{1,2}',
    'ɤɤ'  : '(ɤɤ)',
    'ɤi'  : '(ɤ)aj',
    'ɤy'  : '(ɤ)aj',

}).sort((a, b) => b[0].length - a[0].length)

const initials = Object.keys(initialRegex).sort((a, b) => b.length - a.length)
const vowels = Object.keys(vowelRegex).sort((a, b) => b.length - a.length)
const finals = ['n', 'ng', 'm', 'k', 't', 'p' ].sort((a, b) => b.length - a.length)


function toRegex(word: String) {
    var rest = word
    var res = '^'
    var validChar = true;
    while(rest.length > 0 && validChar){
        if(rest.startsWith(' '))
            rest = rest.trim()
        validChar = false;
        initialRegex.some(element => {
            if( rest.startsWith(element[0])){
                //console.log(element[0])
                res += element[1];
                rest = rest.replace(element[0], '')
                //console.log(res)
                //console.log(rest)
                validChar = true;
                return true
            }
        })
        vowelRegex.some(element => {
            if( rest.startsWith(element[0])){
                res += element[1];
                rest = rest.replace(element[0], '')
                //console.log(res)
                validChar = true;
                return true
            }
        })
    }
    return res + '$'
}
export function getMatches(word: String){
    var matches = Array()
    const regex = toRegex(word).toString();
    
    dict.some((object: EntryType) => {
        if( object['pronunciation-search'].match(regex) ){
            console.log(object["t-entry"])
            matches.push(object)
        }
    })
    console.log(matches)
    return matches;
}

//returns the number of characters which match the original query
export function rankSimilarity(query: String, result: String){
    var qi = 0;
    var ri = 0
    var res = 0;
    var lengthDifference = Math.abs(query.length - result.length)
    res -= lengthDifference;
    while(qi <= query.length && ri < result.length){
        if(query[qi] === result[ri])
            res++;
        else if((query[qi] === 'h' && result[ri] === 'ʰ') || (query[qi] === 'i' && result[ri] === 'j') || (query[qi] === 'u' && result[ri] === 'w'))
            res++;
        else if(result[ri] === 'ŋ' && query[qi] === 'n' && query[qi+1] === 'g'){
            res++;
            qi++;
        }
        
        qi++;
        ri++;
    }

    return res;
}
/*
//console.log(initialRegex)
//var dict = ['taːmkotmaːj', 'tʰaːm1 kot2.maːj5', 'tʰraːmkotmaːj', 'taːmkot', 'krabuaŋ', 'tʰetsakaːn']
var dict = require('@/assets/dictionary/dictionary.json')
var testCases = ['klui']
var regex = testCases.map(toRegex).toString();
//console.log(regex)
regex.forEach( element => {
    const matches = dict.filter(dictItem => dictItem.match(element))
    console.log(matches)
})
    
var matches = Array()
dict.some((object: Entry) => {
    if( object['pronunciation-search'].match(regex) ){
        matches.push(object)
    }
})
console.log("Your input: " + testCases[0]);
console.log("Possible matches");
matches.forEach( obj => {
    console.log( obj['t-entry'] + " ( " + obj['pronunciation'] + " ) : " + obj['e-entry'] );
})
//console.log(regex);
//testSeparation("kung")

*/