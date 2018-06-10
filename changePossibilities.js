"use strict";
/*
 * Question 3 -- changePossibilities(amount,amount): 
 * Your quirky boss collects rare, old coins. They found out 
 * you're a programmer and asked you to solve something they've 
 * been wondering for a long time.
 * 
 * Write a function that, given an amount of money and an array 
 * of coin denominations, computes the number of ways to make 
 * the amount of money with coins of the available denominations.
 * Example: for amount=4 (4¢) and denominations=[1,2,3] 
 * (1¢, 2¢ and 3¢), your program would output 4—the number of 
 * ways to make 4¢ with those denominations:
 * 
 * 1¢, 1¢, 1¢, 1¢
 * 1¢, 1¢, 2¢
 * 1¢, 3¢
 * 2¢, 2¢
 */
function changePossibilities(amount, coins) {
  const possibilities = new Array(amount + 1).fill(0);
  possibilities[0] = 1;
  for (const coin of coins) {
    for (let current = 1; current < amount + 1; current++) {
      if (coin <= current) {
        possibilities[current] = possibilities[current] + possibilities[current - coin];
      }
    }
  }
  return possibilities[amount];
};

/* -----------------------  tests  ----------------------- */
console.log('test1:', changePossibilities(5, [1, 2, 5])); // 4
console.log('test2:', changePossibilities(10, [10]));     // 1
console.log('test3:', changePossibilities(4, [1, 2, 3])); // 4
console.log('test4:', changePossibilities(10, [8]))       // 0