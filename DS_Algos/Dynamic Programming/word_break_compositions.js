/*
Given a word array, 
find the word lists that contains all the words that can compose the word from the given word array.

=======================
Example
=======================
Input:
['star','super','superstar','hero','superhero','superherostar','spring','flower','springflower']

Output:
[
    ['star','super', 'superstar'],
    ['super', 'hero', 'superhero'],
    ['star','super','hero','superhero', superherostar'],
    ['spring', 'flower','springflower']
]

*/

function findCompositions(words) {
    const output = [];

    const wordSet = new Set(words);

    for(const word of words) {
        const compos = [];
        
        helper(0, word, [], curr);
        
        if (curr.length > 1) {
            let currRes = [];
            for (const elem of currRes) {
                res = [ ...currRes, ...elem]; 
            }
            output.push(res);
        }
    }

    function helper(idx, word, curr, currentResult) {
        if (idx === word.length) {
            currentResult.push(curr);
            return;
        }

        if (idx > word.length) return;

        for (let i = idx + 1; i <= word.length; i++) {
            const wordToSearch = word.substring(i);
            if (wordSet.has(wordToSearch)) {
                helper(i, word, wordSet, curr + [word[i]], currentResult);
            }
        }
    }

    return output;
}

const input1 = ['star','super','superstar','hero','superhero','superherostar','spring','flower','springflower'];
const output1 = findCompositions(input1);
console.log(output1)
