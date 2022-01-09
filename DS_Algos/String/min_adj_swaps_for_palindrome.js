/*
    Following is a problem asked frequently from Microsoft on the Online Assessments.
    
    Given a string s, the task is to find out the minimum no of adjacent swaps required to make string s palindrome.
    If it is not possible, then return -1.

    Example 1:
        Input: "mamad"
         Output: 3

    Example 2:
        Input: "asflkj"
        Output: -1

    Example 3:
        Input: "aabb"
        Output: 2

    Example 4:
        Input: "ntiin"
        Output: 1
        Explanation: swap 't' with 'i' => "nitin"

    Big O:
        - Time: O(n^2)
        - Space: O(n)
        
    Resources: 
        - GeekForGeeks (https://www.geeksforgeeks.org/count-minimum-swap-to-make-string-palindrome/)
        - LeetCode Discussion Board (https://leetcode.com/discuss/interview-question/351783/)
*/
function isValidPalindrome(s) {
    const counts = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        const idx = letter.charCodeAt(0) - 'a'.charCodeAt(0);
        counts[idx]++;
    }

    let oddCount = 0;

    for (const val of counts) {
        if (val % 2 !== 0) {
            oddCount++;
        }
    }

    return oddCount <= 1;
}

function minSwapsForPalindrome(s) {
    if (s.length === 0) return -1;

    // If the input string 's' is NOT guaranteed to be a possible palindrome.
    if(!isValidPalindrome(s)) return -1;

    let totalSwaps = 0;

    const arr = s.split("");
    
    const midIdx = Math.floor(arr.length / 2);

    for (let i = 0; i < midIdx; i++) {
        let leftIdx = i;
        let rightIdx = arr.length -  leftIdx - 1;

        const rightfulPosition = rightIdx;

        while (leftIdx < rightIdx) {
            if (arr[leftIdx] === arr[rightIdx]) break;
            rightIdx--;  
        }

        if (leftIdx === rightIdx) {
            swap(leftIdx, leftIdx + 1);
            i--;            
        } else {
            swapToRightfulPosition(rightIdx, rightfulPosition);
        }
    }

    function swapToRightfulPosition(idx, rightfulPosition) {
        for (let i = idx; i < rightfulPosition; i++) {
            swap(i, i + 1);
        }
    }
    
    function swap(i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; 
        totalSwaps++;
    }

    return totalSwaps;
}


const input1 = "mamad";
const output1 = minSwapsForPalindrome(input1);
console.log('output1: ', output1);

const input2 = "asflkj";
const output2 = minSwapsForPalindrome(input2);
console.log('output2: ', output2);

const input3 = "aabb";
const output3 = minSwapsForPalindrome(input3);
console.log('output3: ', output3);

const input4 = "ntiin";
const output4 = minSwapsForPalindrome(input4);
console.log('output4: ', output4);

const input5 = "caa";
const output5 = minSwapsForPalindrome(input5);
console.log('output5: ', output5);

