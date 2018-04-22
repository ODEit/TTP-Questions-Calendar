/**
 * Question A -- sortByStrings(s,t):
   
    Sort the letters in the string s by the order they occur in the string t. 
  You can assume t will not have repetitive characters. 
  For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". 
  For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".
 */


function sortByStrings(s,t){
    
    //making a tracker to keep track of how many times each letter appears in string s
    let trackerS = {}
    
    //initializing and declaring an output string variable
    let outputString = ''
    
    //making a forloop to count the amount of times a letter appears in s
    for(let i = 0; i<s.length; i++ ){
        trackerS[s[i]]? trackerS[s[i]]++ : trackerS[s[i]]=1
    }

    //making a forloop to iterate over t's length and to get what order to display the new string's characters in
    for(let j = 0; j<t.length; j++){
        
        // getting letters in given order from string t, and finding the count in our tracker object and building a string
        // off that count.
        for(let k=0; k<trackerS[t[j]]; k++){
            outputString+=t[j]
        }

    }

    return outputString
}