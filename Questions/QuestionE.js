/**
 * Question E -- decodeString(s): Given an encoded string, return its corresponding decoded string. 

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets 
is repeated exactly k times. Note: k is guaranteed to be a positive integer. 

For s = "4[ab]", the output should be decodeString(s) = "abababab" 
For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"
 */

//Researched a little online and saw that a stack could be useful


//Helper function used to build out and return a string that has to be copied n times
function helper (s,n){
    let output= ''
    for(let i =0; i<n; i++){
      output += s
    }
    return output
  }

  var decodeString = function(s) {

    //the stack
    var stack = [];
    
    for(let i =0 ; i<s.length; i++) {
        //made a sequence string to hold popped off characters from a stack
        //made a frequency string to hold popped off numbers

        let seq = ''
        let freq = '';

        //if s[i] is an ending brace then pop off characters from stack
        // pop off characters until we hit an ending brace

        if (s[i]===']') {
            for(let j = stack.length-1; j>=0; j--) {
                let p = stack.pop();
                
                //when we hit opening brace pop off from the stack if the last 
                //character at index on stack is a number. store number in freq
                // when character is not a number get out of while
                // then run the helper and push the copied seq into stack
                // after break out of the for loop
                if (p === '[') {
                   
                    let k = j - 1
                    while(parseInt(stack[k]) >= 0){
                      freq = stack.pop()+freq
                      k--
                    }
                    freq=parseInt(freq);
                    stack.push(helper(seq,freq));
                    freq = ''
                    seq = ''
                    break;
                }
                else {
                
                //    store popped off characters backwards the way we got them
                    seq = p +seq ;
                }
            }
        }
        else {

            //push in characters as long as they are not a closing bracket

            stack.push(s[i]);
        }
    }

    // make the stack into a string
    return stack.join('');
};
