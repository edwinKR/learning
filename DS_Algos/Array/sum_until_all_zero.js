function sumUntilAllZero(arr) {
    if (arr.length === 0) return 0;

    let result = 0;
    
    let x = arr[0];
    let pos = arr.indexOf(x);
    let numToAdd;

    while (pos > -1) {   

        numToAdd = x;

        for (let i = pos; i < arr.length; i++) {
            const currentNum = arr[i];
            
            if (currentNum - x < 0) {
                x = currentNum; 
                if (x === 0) {
                    x = findFirstNonZero(arr);
                }
                break;
            } 
            
            arr[i] = currentNum - x;
            
            if (i === arr.length - 1) {
                x = findFirstNonZero(arr);
            }
        }

        result += numToAdd;
        pos = arr.indexOf(findFirstNonZero(arr));
    }

    return result;
}

function findFirstNonZero(arr) {
    return arr.find(num => num > 0);
}

const input1 = [4, 7, 5, 0, 0, 2, 8, 9];
const result1 = sumUntilAllZero(input1);
console.log('Sample 1 ===================');
console.log('Output: ', result1);
console.log('Solution: ', Boolean(result1 === 17));
console.log('============================');

const input2 = [0, 0, 0, 0];
const result2 = sumUntilAllZero(input2);
console.log('Sample 2 ===================');
console.log('Output: ', result2);
console.log('Solution: ', Boolean(result2 === 0));
console.log('============================');

const input3 = [4, 5, 3, 8, 1];
const result3 = sumUntilAllZero(input3);
console.log('Sample 3 ===================');
console.log('Output: ', result3);
console.log('Solution: ', Boolean(result3 === 15));
console.log('============================');