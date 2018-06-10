"use strict";
/*
 * Question 1 -- sortByStrings(s,t):
 * Sort the letters in the string s by the order they
 * occur in the string t.
 *
 * (You can assume t will not have repetitive characters.)
 *
 * For s = "weather" and t = "therapyw", the output should
 * be sortByString(s, t) = "theeraw". For s = "good" and
 * t = "odg", the output should be sortByString(s, t) = "oodg".
 */

/*
 * Runtime O(s+t) | Space O(s)
 * @params {s, t} string, string
 * @return {string}
 */

function sortByStrings(s, t) {
  const hashedStringObject = hashString(s);
  return arrangeByCharacter(hashedStringObject, t);
};

/* ----------------------- helpers ----------------------- */
function hashString(string) {
  return string.split("").reduce((container, char) => {
    if (!(char in container)) container[char] = 1;
    else container[char]++;
    return container;
  }, {});
};

function arrangeByCharacter(obj, string) {
  return string.split("").map(char => {
    const duplicateCount = obj[char];
    return char.repeat(duplicateCount);
  }).join("");
};

/* -----------------------  tests  ----------------------- */
console.log('test1:', sortByStrings("weather", "therapyw") === "theeraw"); // "theeraw"
console.log('test2:', sortByStrings("good", "odg") === "oodg"); // "oodg"
console.log('test3:', sortByStrings("pandas", "pad") === "paad"); // "paad"
