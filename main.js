import { Tree } from "./binary_search_tree.js";

function randomArray (num) {
    const array = []
    for (let i = 0; i < num; i++) {
        array.push(Math.floor( Math.random() * 100) );
    }
    return array
}

function insertRandomNumbers (root, num) {
    for (let i = 0; i < num; i++) {
        root = tree.insert(root, Math.floor( Math.random() * 100));
    }
    return root
}

const tree = new Tree;
const array = randomArray(20)

let root = tree.buildTree(array);
tree.prettyPrint(root);
console.log(tree.isBalanced(root));
insertRandomNumbers (root, 30);
tree.prettyPrint(root);
console.log(tree.isBalanced(root));
root = tree.rebalance(root);
tree.prettyPrint(root);
console.log(tree.isBalanced(root));