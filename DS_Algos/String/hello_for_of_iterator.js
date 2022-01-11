// Can iterate through string letter by letter with the 'for..of' iteration.
    // This is a good find as I thought it only worked for arrays.
const str = "hello";

for(const c of str) {
    console.log(c);
}

const arr = str.split("");

for(const l of arr) {
    console.log(l);
}

