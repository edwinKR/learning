function permute(letters) {
    const result = [];
    const visited = new Array(letters.length).fill(false);
    dfs(letters, [], visited, result);
    return result;
}

function dfs(letters, path, visited, result) {
    if(path.length === letters.length) {
        result.push([...path]);
        return;
    }

    for(let i = 0; i < letters.length; i++) {
        if(visited[i]) continue;

        path.push(letters[i]);
        visited[i] = true;

        dfs(letters, path, visited, result);

        path.pop();
        visited[i] = false;
    }
}
// =================================================================
function permute2(letters) {
    const result = [];
    permuteHelper(letters, [], result);
    return result;
}

function permuteHelper(letters, currentPerm, result) {
    if(letters.length === 0 && currentPerm.length > 0) {
        result.push(currentPerm);
        return;
    }
    
    for(let i = 0; i < letters.length; i++) {
        const newLetters = letters.slice(0, i).concat(letters.slice(i + 1));
        const newPermutation = currentPerm.concat([letters[i]]);
        permuteHelper(newLetters, newPermutation, result);
    }
    return;
}

// =================================================================
function permute3(letters) {
    const result = [];
    permuteHelper3(letters, [], result);
    return result;
}

function permuteHelper3(letters, perm, result) {
    // BASE CASE
    if(letters.length === 0) {
        return result.push(perm);   // TIME O(n!) => Base case gets hit n! times
    }

    // TIME O(n^2)
    for(let i = 0; i < letters.length; i++) {   // O(n)
        const newLetters = letters.filter((_, idx) => idx !== i);   // O(n)
        
        const letterToAppend = letters[i];
        const newPerm = [...perm, letterToAppend];

        permuteHelper3(newLetters, newPerm, result);
    }
}

// =================================================================
const letters = ['A', 'B', 'C'];
// =================================================================
// const result = permute(letters);
// console.log('=====================');
// console.log(result);
// =================================================================
// const result2 = permute2(letters);
// console.log('=====================');
// console.log(result2);
// =================================================================
const result3 = permute3(letters);
console.log('=====================');
console.log(result3);
