export class Tree {
    constructor (array, root) {
        this.array = array;
        this.root = root;
    }

    buildTree (array, start = 0, end = array.length - 1) {
        // Sort and prune array once
        if (start === 0 && end === array.length - 1) {
            array = this.mergeSortAndRemoveDuplicates(array);
            end = array.length - 1; // Update end after array has been pruned
        }

        if (start > end) {
            return null;
        }

        let mid = Math.floor( ( start + end ) / 2 );
        let root = new Node(array[mid]);

        root.leftChild = this.buildTree(array, start, mid - 1);
        root.rightChild = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert (root, value) {
        let current = root;
        
        while (current != null) {
            if (value > current.data && current.rightChild != null) {
                current = current.rightChild;
            } 
            else if (value < current.data && current.leftChild != null) {
                current = current.leftChild;
            } 
            else {
                break;
            } 
        }

        if (value > current.data ) {
            current.rightChild = new Node(value);
        }
        else if (value < current.data) {
            current.leftChild = new Node(value);
        }
        return root;

    }

    delete (root, value) {
        let current = root;
        let parent = null;
        let child = null;

        while (current != null) {
            if (value > current.data && current.rightChild != null) {
                child = "right";
                parent = current;
                current = current.rightChild;
            } 
            else if (value < current.data && current.leftChild != null) {
                child = "left";
                parent = current;
                current = current.leftChild;
            } 
            else {
                break;
            }
        }

        // Leaf node
        if (current.leftChild == null && current.rightChild == null) {
            if (child == "left") {
                parent.leftChild = null;
            } 
            else { parent.rightChild = null;}
        }

        // Single child
        else if ((current.leftChild == null && current.rightChild != null)) {
            if (parent == null) {
                root = current.rightChild;
            }
            else if (child == "left") {
                parent.leftChild = current.rightChild;
            }
            else {
                parent.rightChild = current.rightChild;
            }
        }
        else if ((current.leftChild != null && current.rightChild == null)) {
            if (parent == null) {
                root = current.leftChild;
            }
            else if (child == "left") {
                parent.leftChild = current.leftChild;
            }
            else { parent.rightChild = current.leftChild; }
        }

        // Double child
        else if ((current.leftChild != null && current.rightChild != null)) {
            // Find inorder successor
            let successor = current.rightChild;
            let successorParent = current
            while (successor.leftChild != null) {
                successorParent = successor;
                successor = successor.leftChild;
            }
            
            // Move successor children up / delete successor node
            successorParent.leftChild = successor.rightChild;

            // Swap current and successor
            current.data = successor.data;
            if (child == "left" && parent != null) {
                parent.leftChild = successor;
            } else if (child == "left" && parent != null) { 
                parent.rightChild = successor; }
        }

        return root;

    }

    find (node, value) {
        if (node == null) {
            return null
        }

        if (node.data == value) {
            return node;
        }

        const leftFind = this.find(node.leftChild, value);
        if (leftFind != null) {
            return leftFind
        }
        const rightFind = this.find(node.rightChild, value);
        if (rightFind != null) {
            return rightFind
        }
    }

    levelOrderForEach (root, callback) {
        if (typeof callback !== 'function') {
            throw new Error("A valid callback function must be provided to levelOrderForEach()");
        }

        let queue = [root];
        
        while (queue.length > 0) {
            let current = queue.shift();
            callback(current);
            if (current.leftChild != null) {
                queue.push(current.leftChild)
            }
            if (current.rightChild != null) {
                queue.push(current.rightChild)
            }
        }
        return
    }

    inOrderForEach(root, callback) {
        if (typeof callback !== 'function') {
            throw new Error("A valid callback function must be provided to levelOrderForEach()");
        }
        if (root == null) {
            return;
        }

        this.inOrderForEach(root.leftChild, callback);
        callback(root.data)
        this.inOrderForEach(root.rightChild, callback);
    }

    preOrderForEach(root, callback) {
        if (typeof callback !== 'function') {
            throw new Error("A valid callback function must be provided to levelOrderForEach()");
        }
        if (root == null) {
            return;
        }

        callback(root.data)
        this.preOrderForEach(root.leftChild, callback);
        this.preOrderForEach(root.rightChild, callback);
    }

    postOrderForEach(root, callback) {
        if (typeof callback !== 'function') {
            throw new Error("A valid callback function must be provided to levelOrderForEach()");
        }
        if (root == null) {
            return;
        }

        this.postOrderForEach(root.leftChild, callback);
        this.postOrderForEach(root.rightChild, callback);
        callback(root.data)
    }

    height (root, value = null) {
        if (value != null) {
            root = this.find(root, value)
        }

        if ( root == null ) {
            return -1
        } 

        const leftHeight = this.height(root.leftChild);
        const rightHeight = this.height(root.rightChild);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth (node, value) {
        if (node == null) {
            return null;
        }
        
        
        if (node.data == value) {
            return 0;
        }
        
        const leftDepth = this.depth(node.leftChild, value);
        const rightDepth = this.depth(node.rightChild, value);

        if (leftDepth == null && rightDepth == null) {
            return null
        }
        else if (leftDepth == null && rightDepth != null) {
            return 1 + rightDepth;
        }
        else if (leftDepth != null && rightDepth == null) {
            return 1 + leftDepth;
        }
    }
    
    isBalanced (node) {
        if (node == null) {
            return true
        }

        let leftHeight = 0;
        if (node.leftChild != null) {
            leftHeight = this.height(node.leftChild);
        }

        let rightHeight = 0;
        if (node.rightChild != null) {
            rightHeight = this.height(node.rightChild);
        }

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false
        }

        let leftBalanced = true;
        if (node.leftChild != null) {
            leftBalanced = this.isBalanced(node.leftChild)
        }

        let rightBalanced = true;
        if (node.rightChild != null) {
            rightBalanced = this.isBalanced(node.rightChild)
        }
        
        return leftBalanced && rightBalanced;
    }

    rebalance (root) {
        const newArray = [];
        this.inOrderForEach(root, (node) => newArray.push(node));
        
        root = this.buildTree(newArray);
        return root;
    }


    // Taken from my merge sort script: https://github.com/zwhahn/recursion-practice/blob/main/merge_sort.js
    mergeSortAndRemoveDuplicates (array) {
        if (array.length <= 1) {
            return array;
        } 
        else {
            let arrayLength = array.length;
            let half = Math.floor(arrayLength/2);
            let leftHalf = array.slice(0, half);
            let rightHalf = array.slice(half, arrayLength);
            let sortedLeft = this.mergeSortAndRemoveDuplicates(leftHalf);
            let sortedRight = this.mergeSortAndRemoveDuplicates(rightHalf);
            
            let i = 0;
            let j = 0;
            let merged =[]
            
            while ( i < sortedLeft.length && j < sortedRight.length) {
                if (sortedLeft[i] < sortedRight[j]){
                    merged.push(sortedLeft[i]);
                    i++;
                } else if (sortedLeft[i] > sortedRight[j])  {
                    merged.push(sortedRight[j]);
                    j++;
                } else if (sortedLeft[i] == sortedRight[j])  {
                    merged.push(sortedLeft[i]);
                    i++;
                    j++; //skip duplicate
                }
            }
            while (i < sortedLeft.length) {
                merged.push(sortedLeft[i])
                i++
            }
            while (j < sortedRight.length) {
                merged.push(sortedRight[j]);
                j++;
            }
            return merged;
        }
    }

    // Provided by TOP
    prettyPrint (node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.leftChild !== null) {
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };

}

class Node {
    constructor (data = null, leftChild = null, rightChild = null) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}