import { Tree } from "./binary_search_tree.js";

const tree = new Tree;

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const root = tree.buildTree(array)
tree.prettyPrint(root);
tree.insert(root, 6);
tree.prettyPrint(root);
tree.delete(root, 6);
tree.prettyPrint(root);
tree.delete(root, 8);
tree.prettyPrint(root);
console.log(tree.find(root, 5));
// tree.levelOrderForEach(root, console.log)
// tree.postOrderForEach(root, console.log)
console.log(tree.height(root, 3))
console.log(tree.depth(root, 9))
console.log(tree.isBalanced(root))
tree.insert(root, 24);
tree.insert(root, 25);
tree.insert(root, 26);
tree.insert(root, 27);
tree.prettyPrint(root);
console.log(tree.isBalanced(root));
console.log(root)
tree.prettyPrint(tree.rebalance(root));
console.log(tree.isBalanced(tree.rebalance(root)));