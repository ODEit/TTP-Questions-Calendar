/**
 * Question C -- countWays(n): 
 * A child is climb­ing up a stair­case with n steps, and can hop either 1 step,
 *  2 steps, or 3 steps at a time. Imple­ment a method to count how many pos­si­ble
 *  ways the child can jump up the stairs. (Order matters.) This can be solved iteratively
 *  or recursively, either is fine.
 */


 //This is like fibanocci. The trick is the number of steps alotted to skip and the base cases.

 function countWays(n){
    
    //set up an array for tracking, push in the new answers in forloop until you get n
    let track = [1,2,4]

    if(n === 0 ) return 1 //or 0 depending on how you think
    else if(n<=3) return track[n-1]

    for(let i = 3; i<n; i++){
        track[i] = track[i-1] + track[i-2] + track[i-3]
    }

    return track[n-1]
 }



 /**
  * Why this works :
  
  ex:
  
  1 = 1

  2 = 1+1, 2

  3 = 1+2, 1+1+1, 2+1, 3

  4 = 1+3, 1+1+2, 2+2, 1+2+1, 1+1+1+1, 2+1, 3+1


  the numbers nth step is built upon the last three. this is because
  if you notice the last three are either a 3 step away, a 2 step away
  or a 1 step away, each of which the climber can take and each of which gives a different pattern
  than the last.
  */