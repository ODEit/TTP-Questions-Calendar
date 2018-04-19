// Question B --

//  Web Crawler: I wrote a crawler that visits web pages, stores a few keywords in a database,
//  and follows links to other web pages. I noticed that my crawler was wasting a lot of time
//  visiting the same pages over and over, so I made a set, "visited", where I'm storing URLs 
//  I've already visited. Now the crawler only visits a URL if it hasn't already been visited.
//  Let’s see if we can make this crawler use less memory. See if you can come up with a data 
//  structure better than a hash that just stores the entire URL. How can we trim down the amount
//  of space taken up by "visited"? Explain in words and implement your solution.