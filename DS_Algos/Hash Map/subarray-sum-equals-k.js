/*
    LEETCODE PROBLEM #139 Word Break
    https://leetcode.com/problems/subarray-sum-equals-k/

    Time: O(n) | Space: O(n)
*/
function subarrraySum(nums, k) {
    if(nums.length === 0) return 0;

    if(nums.length === 1 && nums[0] !== k) return 0;

    let total = 0;

    const map = new Map();
    map.set(0, 1);

    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        
        if (map.has(sum - k)) {
            // This means we have found a prefix sum to carve out.
            total += map.get(sum - k);
        } 
        
        map.set(sum, map.get(sum) + 1 || 1);
    }

    return total;
}

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