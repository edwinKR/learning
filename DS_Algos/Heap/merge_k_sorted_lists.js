/*
    Input: Array of Sorted Linked Lists
    Output: Single Merged Linked List

    Case#1
    - Input: [1 -> 4 -> 5, 1 -> 3 -> 4, 2 -> 6]
    - Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6

    Case#2
    - Input: []
    - Output: []

    Case#3
    - Input: [empty node]
    - Output: []
*/

class LinkedListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// Building quick sample input
const list1 = new LinkedListNode(1);
list1.next = new LinkedListNode(4);
list1.next.next = new LinkedListNode(5);

const list2 = new LinkedListNode(1);
list2.next = new LinkedListNode(3);
list2.next.next = new LinkedListNode(4);

const list3 = new LinkedListNode(2); 
list3.next = new LinkedListNode(6);

const input1 = [list1, list2, list3];
console.log(input1)

// Function to build merge lists

// Approach: Create a Priority Queue using min Heap
// TIME: O(n*log(k)) => 'k' is the number of lists | 'n' is the number of ALL the linked list nodes
// SPACE: O(n) => 'n' is the size of the merged output linked list.
const mergeKSortedLists = (lists) => {
    if(!lists.length) return [];
    
    // Build a Priority Queue using Heap
        // Assume it will have following operations: enqueue, dequeue, isEmpty
    const pq = new PriorityQueue((aNode, bNode) => aNode.val - bNode.val);

    // TIME: O(k) * O(log(k)) = O(k*log(k))
    lists.forEach(listNode => {
        if(listNode) {
            pq.enqueue(listNode);
        }
    });

    // At this point, pq is: [{1 -> 4 -> 5}, {1 -> 3 -> 4}, {2 -> 6}]]

    const dummy = new LinkedListNode(-1);
    
    // TIME: O(k*log(n))
    let pointer = dummy;
    while(!pq.isEmpty()) {
        const nextPromisingNode = pq.dequeue(); // O(log(n))
        pointer.next = nextPromisingNode;
        pointer = pointer.next;
        if(pointer.next) pq.enqueue(pointer.next);  // O(log(n))
    }

    return dummy.next;
}

class PriorityQueue {
    constructor(compareFunc) {
        this.comparator = compareFunc || ((a, b) => a - b);
        this.heap = [];
    }

    // TIME: O(log(n)) | SPACE: O(n)
    enqueue(element) {
        this.heap.push(element);
        this.bubbleUp(this.heap.length - 1);
    }

    // TIME: O(log(n)) | SPACE: O(n)
    dequeue() {
        if(this.isEmpty()) return;

        // idx is always going to be zero(root node)
        this.swap(0, this.heap.length - 1);
        const minNode = this.heap.pop();
        this.bubbleDown(0);
        return minNode;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp(idx) {
        if(idx <= 0) return;

        const parentIdx = Math.floor((idx - 1) / 2);
        if(parentIdx >= 0 
            && this.comparator(this.heap[parentIdx], this.heap[idx]) > 0) {
            // parentIdx value is larger than childIdx.
            // Hence, need to swap parentIdx value and childIdx value.
            this.swap(parentIdx, idx);
            this.bubbleUp(parentIdx);
        }
    }

    bubbleDown(idx) {
        const leftChildIdx = 2 * idx + 1;
        const rightChildIdx = 2 * idx + 2;

        if(leftChildIdx >= this.heap.length) return;

        let swapIdx = leftChildIdx;
        if(rightChildIdx < this.heap.length) {
            if(this.comparator(this.heap[leftChildIdx], this.heap[rightChildIdx]) > 0) {
                // leftChildIdx value is bigger than the rightChildIdx value.
                // Hence, swapIdx should be the rightChildIdx.
                swapIdx = rightChildIdx;
            }
        }
        
        // At this point, we have the right swapIdx to deal with.
        if(this.comparator(this.heap[idx], this.heap[swapIdx]) > 0) {
            this.swap(swapIdx, idx);
            this.bubbleDown(swapIdx);
        }
    }

    swap(i, j) {
        // [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        const temp = this.heap[j];
        this.heap[j] = this.heap[i];
        this.heap[i] = temp;
    }
}


// Print output
console.log("===OUTPUT====", mergeKSortedLists(input1));