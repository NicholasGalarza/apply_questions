"use strict";
/*
 * Question 2 -- decodeString(s): Given an encoded string, 
 * return its corresponding decoded string.
 * 
 * 
 * The encoding rule is: k[encoded_string], where the encoded_string 
 * inside the square brackets is repeated exactly k times. 
 * Note: k is guaranteed to be a positive integer.
 * 
 * For s = "4[ab]", the output should be decodeString(s) = "abababab"
 *  
 * For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"
 */

function decodeString(s) {
  s = s.split("")
  return decodeStringHelper(s, 1);
};

function decodeStringHelper(strArr, duplicate) {
  let decodedString = "";
  let bracketCounter = 0;
  let container = [];

  for (const element of strArr) {
    if (element === '[') bracketCounter++;
    if (bracketCounter > 0 || isNumber(element)) container.push(element);
    if (element === ']') bracketCounter--;
    // handles the case for when letters are outside the brackets
    if (/[a-zA-Z]/.test(element) && container.length === 0) decodedString += element;

    if (bracketCounter === 0 && container.includes('[', ']')) {
      const duplicateCount = extractDuplicateCounter(container)
      container = extractBetweenBrackets(container, duplicateCount.length);
      decodedString += decodeStringHelper(container, duplicateCount);
      container = []; // reset upon exit
    }
  }

  return decodedString.repeat(duplicate)
}

function isNumber(element) { return !isNaN(element) }

function extractDuplicateCounter(container) {
  let string = "";
  for (const value of container) {
    if (isNumber(value)) string += value;
    else break;
  }
  return string.length ? string : '1';
}

function extractBetweenBrackets(container, start) {
  const idx = isNumber(container[0]) ? (start + 1) : 1
  return container.slice(idx, container.length - 1)
}

// basic test
console.log("test1:", decodeString("4[ab]")) // "abababab"
// test for nested brackets
console.log("test2:", decodeString("2[b3[a]]")) // "baaabaaa"
// test for characters outside of brackets
console.log("test3:", decodeString("ab2[a]f")) // "abaaf"
// test for numbers larger than a single digit
console.log("test4:", decodeString("10[ha]")) // "hahahahahahahahahaha"
// extra characters get excluded
console.log("test5:", decodeString("3[hello_world]")) // "helloworldhelloworldhelloworld"
// sanity checks
console.log("test6:", decodeString("1000[ha]")) // "lots of {ha}'s in the terminal ..."
console.log("test7:", decodeString(""))
