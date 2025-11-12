export class Tree {
    constructor (array, root) {
        this.array = array;
        this.root = root;
    }

    buildTree (array, start = 0, end = array.length -1) {
        if (start === 0 && end === array.length - 1) {
            array = this.mergeSortAndRemoveDuplicates(array);
        }

        if (start > end) {
            return null;
        }

        let mid = Math.floor( ( start + end ) / 2 );
        let root = new Node(array[mid])
        
        root.left_child = this.buildTree(array, start, mid - 1);
        root.right_child = this.buildTree(array, mid + 1, end);

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