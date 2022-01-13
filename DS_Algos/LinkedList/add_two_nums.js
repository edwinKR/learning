/*
    Lesson learned:
    - Javascript primitive data type: BigInt
        - If number is too big to parse, parseInt(num) will return NaN
        - Hence, should use BigInt(num)
*/

/*
LeetCode #445. Add Two Numbers II

You are given two non-empty linked lists representing two non-negative integers.
The most significant digit comes first and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.
*/

// ====================GIVEN==============================
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

const l1 = new ListNode(7);
l1.next = new ListNode(2);
l1.next.next = new ListNode(4);
l1.next.next.next = new ListNode(3);
console.log("l1 ", l1);

const l2 = new ListNode(5);
l1.next = new ListNode(6);
l1.next.next = new ListNode(4);
console.log("l2 ", l2);
// ========================================================

// ========================================================
// SOLUTION #1
// TIME O(max(n, m))
// SPACE O(1) if output LinkedList is disregarded. Else, O(max(n, m))
// ========================================================
var addTwoNumbers1 = function(l1, l2) {
    const num1 = getInt(l1);
    const num2 = getInt(l2);

    const num3 = num1 + num2;

    const l3 = generateLinkedList(num3);

    return l3;
};
  

function getInt(node) {
    let str = '';
    let p = node;

    while(p) {
        str += p.val;
        p = node.next;
    }

    return BigInt(str);
}

function generateLinkedList(num) {
    const str = num + '';
    const arr = str.split("");

    const dummy = new ListNode(-1);
    let p = dummy;

    for(const letterNum of arr) {
        const singleNum = parseInt(letterNum);
        const newNode = new ListNode(singleNum);
        p.next = newNode;
        p = p.next;
    }

    return dummy.next;
}

// ------------------------------------------
const result1 = addTwoNumbers1(l1, l2);
console.log("RESULT 1~~~~~~~~~");
console.log(result1);
// ------------------------------------------

// ========================================================
// SOLUTION #2 - Using the Reverse LinkedList. (TBD)
// TIME O(max(n, m))
// SPACE O(1) if output LinkedList is disregarded. Else, O(max(n, m))
// ========================================================

// ------------------------------------------
const result2 = addTwoNumbers2(l1, l2);
console.log("RESULT 2~~~~~~~~~");
console.log(result2);
// ------------------------------------------
