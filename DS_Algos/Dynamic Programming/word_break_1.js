// LEETCODE PROBLEM #139 Word Break
// https://leetcode.com/problems/word-break/

function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const map = new Map();
    
    return helper(s);
    
    function helper(str) { 
      if(map.has(str)) return map.get(str);  
      
      if(wordSet.has(str)) return true;
      
      for(let i = 1; i < str.length; i++) {
        const prefix = str.substring(0, i);
          
        if(wordSet.has(prefix)) {  
          const remainings = str.substring(i);
          
          let isValid = helper(remainings);
          if(isValid) {
            map.set(str, true);
            return true;
          }        
        }
      }
  
      map.set(str, false);
  
      return false;
    }
}

const s1 = "applepenapple";
const wordDict1 = ["apple","pen"];
const result1 = wordBreak(s1, wordDict1);
console.log('Sample 1 ===================');
console.log('Output: ', result1);
console.log('Solution: ', true);
console.log('============================');

const s2 = "catsandog";
const wordDict2 = ["cats","dog","sand","and","cat"];
const result2 = wordBreak(s2, wordDict2);
console.log('Sample 2 ===================');
console.log('Output: ', result2);
console.log('Solution: ', false);
console.log('============================');