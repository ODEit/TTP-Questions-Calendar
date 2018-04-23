/**
 * Question F -- changePossibilities(amount,amount): 
 * Your quirky boss collects rare, old coins. They found out you're
 * a programmer and asked you to solve something they've been wondering for a long time. 

Write a function that, given an amount of money and an array of coin denominations, 
computes the number of ways to make the amount of money with coins of the available denominations. 

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 
4—the number of ways to make 4¢ with those denominations: 

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢


 */

 // Similar to fibanoccis, and question c

 function changePossibilities (amount, coins){
    let arr = []

    for(let i = 0; i<amount; i++){
        arr[i] = 0
    }

    for(let i = 0; i<coins.length; i++){
        if(arr[coins[i]-1]!==undefined) arr[coins[i]-1] = 1
    }
    
    for(let i = 0; i<amount; i++){
        let stack = []
        let count = 0

        for(let j = 0; j<coins.length; j++){
          
          if(i-coins[j]<0) continue
         

          stack.push(arr[i-coins[j]])

        }
      
        while(stack.length){
            count += stack.pop()
        }
        arr[i] += count
    }

    return arr[arr.length-1]
 }

