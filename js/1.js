"use strict";
function getSequence(nums) {
    // 贪心算法+二分法+前驱节点
    // 贪心：不管顺序，直接整最长递增子序列。
    // 二分： 提高性能。
    // 前驱节点： 记录真正的序列索引。
    let indexArr = []; // 存索引
    let preIndexArr = [];
    for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        const arrLast = nums[indexArr[indexArr.length - 1]];
        if (v > arrLast || !indexArr.length) {
            // 大于直接加
            indexArr.push(i);
            preIndexArr.push(indexArr[indexArr.length - 2]);
        }
        if (v < arrLast) {
            // 小于二分查找,找到比他大的最小值替换
            let start = 0, end = indexArr.length - 1, middle = 0;
            while (end >= start) {
                middle = Math.floor((start + end) / 2);
                if (nums[indexArr[middle]] > v) {
                    end = middle - 1;
                }
                else if (nums[indexArr[middle]] < v) {
                    start = middle + 1;
                }
                else {
                    start = middle;
                    break;
                }
            }
            if (nums[indexArr[start]] > v) {
                indexArr[start] = i;
                preIndexArr.push(indexArr[start - 1]);
            }
            else {
                preIndexArr.push(undefined);
            }
        }
        if (v === arrLast) {
            preIndexArr.push(undefined);
        }
    }
    let res = [nums[indexArr[indexArr.length - 1]]];
    let p = preIndexArr[indexArr[indexArr.length - 1]];
    while (p !== undefined) {
        let v = nums[p];
        res.unshift(v);
        p = preIndexArr[p];
    }
    return res;
}
console.log(getSequence([1, 1, 1,]));
console.log(getSequence([1, 3, 2, 3, 2])); //[1,2,3]
console.log(getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4])); // [2,3,5,6,8,9]
console.log(getSequence([9, 2, 3])); // [2,3]  [u,]
console.log(getSequence([4, 10, 4, 3, 8, 9])); // [3,8,9]
console.log(getSequence([0, 1, 3, 2, 3])); // [0,1,2,3] 
console.log(getSequence([3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12])); // [2,4,5,6,7,12]
