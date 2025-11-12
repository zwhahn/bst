import { Tree } from "./binary_search_tree.js";

const tree = new Tree;

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
tree.prettyPrint(tree.buildTree(array));