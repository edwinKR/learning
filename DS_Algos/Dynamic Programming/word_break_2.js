/*
Given a word array, 
find the word lists that contains all the words that can compose the word from the given word array.

=======================
Example
=======================
Input:
['star','super','superstar','hero','superhero','superherostar','spring','flower','springflower']

wordSet: 
{'star','super','superstar','hero','superhero','superherostar','spring','flower','springflower'}



Output:
[
    ['star','super', 'superstar'],
    ['super', 'hero', 'superhero'],
    ['star','super','hero','superhero', superherostar'],
    ['spring', 'flower','springflower']
]

*/

function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);

    const memo = new Map();

    return helper(s);

    function helper(currentStr) {
        if (memo.has(currentStr)) {
            return memo.get(currentStr);
        }

        let result = [];

        if (wordSet.has(currentStr)) {
            result.push(currentStr);
        }

        for (let i = 1; i < currentStr.length; i++) {
            const prefix = currentStr.substring(i);
            
            if (wordSet.has(prefix)) {
                const remainings = helper(currentStr.substring(0, i));
                const newPhrase = remainings.map(l => `${l} ${s2}`);
                result = [ ...result, ...newPhrase];
            }
        }

        memo.set(currentStr, result);
        return result;
    }
}

const input1 = 