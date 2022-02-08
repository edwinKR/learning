/*
    LEETCODE PROBLEM #721 Account Merge
    https://leetcode.com/problems/accounts-merge/

    Time: O(nk*log(nk))
        - n is number of accounts.
        - k is max length of an account(max number of emails for an account)
        - nk for iterating through all emails.
        - nk*log(nk) for sorting emails
        - final: nk + nk*log(nk) ==> nl*(log(nk)
    Space: O(nk)
        - nk for adj list graph
        - nk for visited set 
        - nk for max dfs call stack
        - final: 3nk ==> nk
*/

function accountsMerge (accounts) {
    // Building graph (adjList)
    const emailNameDict = new Map();
    const graph = new Map();
    
    for(const account of accounts) {
      const name = account[0];
      const firstEmail = account[1];
  
      for(let i = 1; i < account.length; i++) {
        const email = account[i];
        
        emailNameDict.set(email, name);
        
        if(!graph.has(email)) {
          graph.set(email, new Set());
        }
        
        graph.get(email).add(firstEmail);
        graph.get(firstEmail).add(email);
      }
    }
      
    // DFS each email node to find and get same person account
    const output = [];
  
    const visited = new Set();
  
    for(const currEmail of graph.keys()) {
      const tempEmailStore = [];
      
      if(!visited.has(currEmail)) {
        dfs(currEmail, visited, tempEmailStore, graph);
      }
      
      if(tempEmailStore.length > 0) {
        tempEmailStore.sort();
        const name = emailNameDict.get(currEmail);
        const mergedAccount = [name, ...tempEmailStore];
        output.push(mergedAccount);
      }
    }
    
    return output;
  };
  
  function dfs(currEmail, visited, tempEmailStore, graph) {
    visited.add(currEmail);
    tempEmailStore.push(currEmail);
    const neighbors = graph.get(currEmail);
    
    for(const neighborEmail of neighbors) {
      if(!visited.has(neighborEmail)) {
        dfs(neighborEmail, visited, tempEmailStore, graph);
      }
    }
  }

// =============================================================
//  TEST
// =============================================================
const accounts1 = [
    ["John","johnsmith@mail.com","john_newyork@mail.com"],
    ["John","johnsmith@mail.com","john00@mail.com"],
    ["Mary","mary@mail.com"],
    ["John","johnnybravo@mail.com"]
];

const result1 = accountsMerge(accounts1);
const solution1 = [
    ["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
    ["Mary","mary@mail.com"],
    ["John","johnnybravo@mail.com"]
];
console.log('Sample 1 ===================');
console.log('Output: ', result1);
console.log('Solution: ', solution1);
console.log('============================');