/**
 * 求序列的乘积。
 */
export function pi(arr: bigint[]): bigint {
    return arr.reduce((prev, curr) => prev * curr, BigInt(1))
}

/**
 * 将数值约束在一个范围内。
 *
 * @param floor   最小值。
 * @param n       被约束的值。
 * @param ceiling 最大值。
 */
export function limit(floor: number, n: number, ceiling: number): number {
    if (floor > n)
        return floor
    if (n > ceiling)
        return ceiling
    return n
}
