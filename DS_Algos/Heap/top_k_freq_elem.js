var topKFrequent = function(nums, k) {
    // Quick Select: Avg Time O(n) Worst Time O(n^2) | Space O(1)
    // Min Heap: Time O(nlog(k)) | Space O(n)
  
    if(nums.length === 0) return null;
    
    // Build FreqMap
    const freqMap = new Map();
    nums.forEach(num => {
      freqMap.set(num, (freqMap.get(num) || 0) + 1);
    });
  
    const keys = [...freqMap.keys()];
    console.log(keys)
    const finalPosition = keys.length - k; 
    return quickSelect(0, keys.length - 1, keys, freqMap, finalPosition);
  };
  
  function quickSelect(startIdx, endIdx, keys, freqMap, finalPosition) { 
    let pivotIdx = partition(startIdx, endIdx, keys, freqMap);
    
    if(pivotIdx < finalPosition) {
      return quickSelect(pivotIdx + 1, endIdx, keys, freqMap, finalPosition);
    } else if(pivotIdx > finalPosition) {
      return quickSelect(startIdx, pivotIdx - 1, keys, freqMap, finalPosition);
    } else {
      // BASE CASE: pivotIdx === finalPosition
      return keys.slice(pivotIdx);
    }
  }
  
  function partition(left, right, keys, freqMap) {
    let i = left;
    let j = left;
    
    while(j < right) {
      if(freqMap.get(keys[j]) < freqMap.get(keys[right])) {
        swap(i, j, keys);
        i++;
      }
      j++;
    }
    
    swap(i, right, keys);
    return i;
  }
  
  function swap(i, j, keys) {
    const temp = keys[j];
    keys[j] = keys[i];
    keys[i] = temp;
  }

  const nums = [1,1,1,2,2,3,4,4,4,4];
  const k = 3;
  const result = topKFrequent(nums, k);
  console.log("~~~~~", result)