/**
 * 按照指定长度数组对对象数组进行分组。
 *
 * @example
 * // [[9,9], [7,7,7], [6]]
 * chunks([9,9,7,7,7,6], [2,3,1])
 *
 * @param array 原始数组。
 * @param sizes 每组的长度数组，如 [32, 16, 16, 16, 48]
 * @returns 分组后的二维数组
 */
export function chunks<T>(array: T[], sizes: number[]): T[][] {
    const result: T[][] = [];
    let index = 0;

    for (const size of sizes) {
        const group = array.slice(index, index + size);
        result.push(group);
        index += size;
    }

    return result;
}
