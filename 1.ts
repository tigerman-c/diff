function getSequence(nums: number[]): number[] {
    // 贪心算法+二分法+前驱节点
    // 贪心：不管顺序，直接整最长递增子序列。
    // 二分： 提高性能。
    // 前驱节点： 记录真正的序列索引。
    let arr: number[] = []
    let preIndexArr: (number | undefined)[] = []
    for (let i = 0; i < nums.length; i++) {
        const v = nums[i]
        if (!arr.length) {
            arr.push(v)
            let preIndex = i - 1 >= 0 ? i - 1 : undefined
            preIndexArr.push(preIndex)
        } else {
            if (v > arr[arr.length - 1]) {
                // 大于直接加
                arr.push(v)
                let preIndex = i - 1 >= 0 ? i - 1 : undefined
                preIndexArr.push(preIndex)
            }
            if (v < arr[arr.length - 1]) {
                // 小于二分查找,找到比他大的最小值替换
                let start = 0, end = arr.length - 1, middle;
                while (end > start) {
                    middle = Math.floor((start + end) / 2)
                    if (arr[middle] > v) {
                        end = middle
                    } else {
                        start = middle + 1
                    }
                }
                if (middle !== undefined && arr[middle] > v) {
                    // arr[middle] = v
                    let preIndex = middle - 1 >= 0 ? middle - 1 : undefined
                    preIndexArr[i] = preIndex
                } else {
                    preIndexArr[i] = undefined
                }
            }
        }
        // if (!arr.length  arr[arr.length - 1])
    }
    let res = [arr[arr.length - 1]]
    console.log(arr,preIndexArr, 111)
    for (let i = nums.indexOf(res[0]); i >= 0; i--) {
        const preIndex = preIndexArr[i]
        if (preIndex !== undefined && !res.includes(nums[preIndex])) {
            res.unshift(nums[preIndex])
        }
    }
    return res
}

console.log(getSequence([1, 3, 2]))
console.log(getSequence([2,3,1,5,6,8,7,9,4]))

