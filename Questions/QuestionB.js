//  Question B --

//   Web Crawler: I wrote a crawler that visits web pages, stores a few keywords in a database,
//   and follows links to other web pages. I noticed that my crawler was wasting a lot of time
//   visiting the same pages over and over, so I made a set, "visited", where I'm storing URLs 
//  I've already visited. Now the crawler only visits a URL if it hasn't already been visited.
//   Let’s see if we can make this crawler use less memory. See if you can come up with a data 
//  structure better than a hash that just stores the entire URL. How can we trim down the amount
//   of space taken up by "visited"? Explain in words and implement your solution.


/*
 
        One way I've found through research is creating a trie data structure. The thought process behind
    this is simple. Instead of having a set that stores all URL's visited and bloating our memory with 
    unneeded repetition of similar prefixes (ie. www.eat/food, www.eat/more) we can store prefixes in
    some nested structure like a trie. This will conserve our memory because now we dont have to keep
    storing the same string prefixes, we do it once and thats it. We can then latch on to the stored prefixes
    as starting points for the unique paths. The prefixes in our trie approach would be each letter in our url.
    
        So if we wanted to store all URL's that held at most 4 characters in their string in our previous 
    data structure we would have to allocate memory for every URL's string, even though there are probably
    a lot of repeating starting points ie( mo, mon, mont ). What this amounts to in a structure that 
    has to store all possible permutations of 4 characters or less strings in our english alphabet 
    (not counting uniqueness in upper or lower case letters) is a space complexity of 4*26^4 + 3*26^3 + 2*26^2 + 26 
    or in short n26^n. 
    
        The reason it comes out to this is because there are 26 characters in the english alphabet, which
    means 26 options for each position in a URL string (if your URL is 4 characters long, there are 26 options for the
    first character placed, 26 for the second, 26 for the thrid and 26 for the fourth). This adds to the fact that
    each string placed has to allocate for each character in the string. So 'eare', and 'earr' would each need 4 characters
    placed for them totaling to 8 characters, even though they share common prefixes 'ear-'. All these factors lead to a complexity 
    of n characters * the total possible amount of string permutations for an n length string.

        What a trie data structure would do with the same problem is allocate in memory for each character in a string only 
    once and build out a structure that passes references to common starting paths. This leads to a direct cut in the repeated
    allocation of similar prefixes. So the complexity for the same question asked above would be 26^n, a cut of a factor of n.
    So for the last example with 'eare' and 'earr' you've only allocated to 5 characters plus an agreed special ending character 
    for each unique url which leads to 7 characters. There's three for ear, the common prefix, 2 more for the different characters
    at the end 'e' and 'r', and 2 more for the special ending character, maybe a '*', which leads to 7 allocated space.
    
        This may not seem like a lot now but lets take in more similar looking urls. 'eare', 'earr', 'eara', 'earb', 'earv'. These 5 urls
    amount to  5 * 4 space or 20 space in the given solution above. But with a trie datastructure it leads to 3 + 2*5 which is 13 space.
    If we took the whole set of similar looking 4 character urls with the same starting prefix 'ear' (26 urls), the given solution above would
    give us a 26*4 space or 104 space, and the trie structure would have a 3+2*26 space which is 57 space. We have essentialy halfed our space
    with this small example. 

 */



//Below is the javascript solution I found. It implements a trie through creating nested objects

function Trie() {
    this.rootNode = {};
}

Trie.prototype.addWord = function(word) {

    var currentNode = this.rootNode;
    var isNewWord = false;

    // Work downwards through the trie, adding nodes
    // as needed, and keeping track of whether we add
    // any nodes.
    for (var i = 0; i < word.length; i++) {
        var char = word[i];

        //nesting process. if the currentNode doesnt have a certain character 
        //it creates a key value pairing with the new character as the key and the 
        //value as another empty object
        if (!currentNode.hasOwnProperty(char)) {
            isNewWord = true;
            currentNode[char] = {};
        }

        currentNode = currentNode[char];
    }

    // Explicitly mark the end of a word.
    // Otherwise, we might say a word is
    // present if it is a prefix of a different,
    // longer word that was added earlier.
    if (!currentNode.hasOwnProperty("End of Word")) {
        isNewWord = true;
        currentNode["End of Word"] = {};
    }

    return isNewWord;
}