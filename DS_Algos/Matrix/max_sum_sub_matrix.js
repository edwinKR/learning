
function findMaxSumSubMatrix(matrix, k) {
    if(!matrix || !matrix.length) return [];

    const M = matrix.length;
    const N = matrix[0].length;

    const sum = preprocess(matrix, M, N);

    let total = Number.NEGATIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    let p = [];

    for (let i = k - 1; i < M; i++) {
        for (let j = k - 1; j < N; j++) {
            total = sum[i][j];

            if (i - k >= 0) {
                total = total - sum[i - k][j];
            }

            if (j - k >= 0) {
                total = total - sum[i][j - k];
            }

            if (i - k >= 0 && j - k >= 0) {
                total = total + sum[i - k][j - k];
            }

            if (total >= max) {
                if (total === max) {
                    p.push([i, j]);
                } else {
                    max = total;
                    p = [[i, j]];
                }
            }
        }
    }

    // const output = [];
    
    const set = new Set();
    for(const coord of p) {
        updateSetFromSubMatrix(coord);
    }

    function updateSetFromSubMatrix(coord) {
        for (let i = 0; i < k; i++) {
            // const row = [];
            for (let j = 0; j < k; j++) {
                let r = i + coord[0] - k + 1;
                let c = j + coord[1] - k + 1;
                // row.push(matrix[r][c]);
                set.add(matrix[r][c]);
            }
            // output.push(row);
        }       
    }

    const distinctSum = getSumOfSet(set);
    function getSumOfSet(set) {
        let total = 0;
        [...set].forEach(num => {
            total += num;
        })
        return total;
    }
    return distinctSum;
}

function preprocess(matrix, M, N) {
    const sum = matrix.map(row => row.map(val => 0));
    sum[0][0] = matrix[0][0];

    for (let j = 1; j < matrix[0].length; j++) {
        sum[0][j] = matrix[0][j] + sum[0][j - 1];
    }

    for (let i = 1; i < matrix.length; i++) {
        sum[i][0] = matrix[i][0] + sum[i - 1][0];
    }

    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[0].length; j++) {
            sum[i][j] = matrix[i][j] + sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1];
        }
    }

    return sum;
}

const matrix1 = [
    [3, -4, 6, -5, 1],
    [1, -2, 8, -4, -2],
    [3, -8, 9, 3, 1],
    [-7, 3, 4, 2,  7],
    [-3, 7, -5, 7, -6]
];

const k1 = 2;

const result1 = findMaxSumSubMatrix(matrix1, k1);
console.log(result1);

const matrix2 = [
    [1, 0, 1, 5, 6],
    [3, 3, 0, 3, 3],
    [2, 9, 2, 1, 2],
    [0, 2, 4, 2, 0]
];

const k2 = 2;

const result2 = findMaxSumSubMatrix(matrix2, k2);
console.log(result2);