/*
    LEETCODE PROBLEM #953. 
    https://leetcode.com/problems/verifying-an-alien-dictionary/
    
    Solution I like: https://leetcode.com/problems/verifying-an-alien-dictionary/discuss/386973/Simple-JavaScript-solution%3A-map-%2B-comparator

    TODO: NEED TO UPDATE BIG O
    Time:  | Space: 
*/
function validAlienDictionary(words, order) {
    if(words.length === 1) return true;
    
    // Build dictionary 
    const dict = new Map();
    for(let i = 0; i < order.length; i++) {
      const char = order[i];
      dict.set(char, i);
    }
    
    for(let i = 0; i < words.length - 1; i++) {
      const word1 = words[i];
      const word2 = words[i + 1];
      
      let isValid = wordCompareHelper(word1, word2);  // returns true if the word1 is in the right position
      if(!isValid) return false;
    }
  
    function wordCompareHelper(word1, word2) {
      const len = Math.min(word1.length, word2.length);
      
      for(let i = 0; i < len; i++) {
        const char1 = word1[i];
        const char2 = word2[i];
        
        if(char1 === char2) continue;
        
        const idx1 = dict.get(char1);
        const idx2 = dict.get(char2);
        if(idx1 > idx2) return false;
        if(idx1 < idx2) return true;
      }
      
      if(word1.length > word2.length) return false;
      
      return true;
      
    }
    return true;
  };
  

  // TODO: NEED TO UPDATE THE BELOW  
const input1 = [1, -1, 1, 1, 1, 1];
const k1 = 3;
const result1 = subarrraySum(input1, k1);
console.log('Sample 1 ===================');
console.log('Output: ', result1);
console.log('Solution: ', Boolean(result1 === 4));
console.log('============================');

const input2 = [0, 0];
const k2 = 0;
const result2 = subarrraySum(input2, k2);
console.log('Sample 2 ===================');
console.log('Output: ', result2);
console.log('Solution: ', Boolean(result2 === 3));
console.log('============================');

const input3 = [1, 2, 3];
const k3 = 3;
const result3 = subarrraySum(input3, k3);
console.log('Sample 3 ===================');
console.log('Output: ', result3);
console.log('Solution: ', Boolean(result3 === 2));
console.log('============================');