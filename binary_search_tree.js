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

        root.left_child = this.buildTree(array, start, mid - 1);
        root.right_child = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert (root, value) {
        let current = root;
        console.log(current.data)
        
        while (current != null) {
            console.log("current data: ", current.data);
            if (value > current.data && current.right_child != null) {
                console.log("move right")
                current = current.right_child;
            } 
            else if (value < current.data && current.left_child != null) {
                console.log("move left")
                current = current.left_child;
            } 
            else {
                console.log("found node")
                break;
            } 
        }

        if (value > current.data ) {
            current.right_child = new Node(value);
        }
        else if (value < current.data) {
            current.left_child = new Node(value);
        }
        return root;

    }

    delete (root, value) {
        console.log(`----- Deleting Node ${value} ------`)
        let current = root;
        let parent = null;
        let child = null;

        while (current != null) {
            console.log("current data: ", current.data);
            if (value > current.data && current.right_child != null) {
                console.log("move right")
                child = "right";
                parent = current;
                current = current.right_child;
            } 
            else if (value < current.data && current.left_child != null) {
                console.log("move left")
                child = "left";
                parent = current;
                current = current.left_child;
            } 
            else {
                console.log("found node")
                break;
            }
        }

        // Leaf node
        if (current.left_child == null && current.right_child == null) {
            if (child == "left") {
                parent.left_child = null;
            } 
            else { parent.right_child = null;}
        }

        // Single child
        else if ((current.left_child == null && current.right_child != null)) {
            if (parent == null) {
                root = current.right_child;
            }
            else if (child == "left") {
                parent.left_child = current.right_child;
            }
            else {
                parent.right_child = current.right_child;
            }
        }
        else if ((current.left_child != null && current.right_child == null)) {
            if (parent == null) {
                root = current.left_child;
            }
            else if (child == "left") {
                parent.left_child = current.left_child;
            }
            else { parent.right_child = current.left_child; }
        }

        // Double child
        else if ((current.left_child != null && current.right_child != null)) {
            // Find inorder successor
            let successor = current.right_child;
            let successorParent = current
            while (successor.left_child != null) {
                successorParent = successor;
                successor = successor.left_child;
            }
            
            // Move successor children up / delete successor node
            successorParent.left_child = successor.right_child;

            // Swap current and successor
            current.data = successor.data;
            if (child == "left" && parent != null) {
                parent.left_child = successor;
            } else if (child == "left" && parent != null) { 
                parent.right_child = successor; }
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

        const leftFind = this.find(node.left_child, value);
        if (leftFind != null) {
            return leftFind
        }
        const rightFind = this.find(node.right_child, value);
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
            if (current.left_child != null) {
                queue.push(current.left_child)
            }
            if (current.right_child != null) {
                queue.push(current.right_child)
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

        this.inOrderForEach(root.left_child, callback);
        callback(root.data)
        this.inOrderForEach(root.right_child, callback);
    }

    preOrderForEach(root, callback) {
        if (typeof callback !== 'function') {
            throw new Error("A valid callback function must be provided to levelOrderForEach()");
        }
        if (root == null) {
            return;
        }

        callback(root.data)
        this.preOrderForEach(root.left_child, callback);
        this.preOrderForEach(root.right_child, callback);
    }

    postOrderForEach(root, callback) {
        if (typeof callback !== 'function') {
            throw new Error("A valid callback function must be provided to levelOrderForEach()");
        }
        if (root == null) {
            return;
        }

        this.postOrderForEach(root.left_child, callback);
        this.postOrderForEach(root.right_child, callback);
        callback(root.data)
    }

    height (root, value = null) {
        if (value != null) {
            root = this.find(root, value)
        }

        if ( root == null ) {
            return -1
        } 

        const leftHeight = this.height(root.left_child);
        const rightHeight = this.height(root.right_child);

        return 1 + Math.max(leftHeight, rightHeight);
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
        if (node.right_child !== null) {
            this.prettyPrint(node.right_child, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left_child !== null) {
            this.prettyPrint(node.left_child, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };

}

class Node {
    constructor (data = null, left_child = null, right_child = null) {
        this.data = data;
        this.left_child = left_child;
        this.right_child = right_child;
    }
}