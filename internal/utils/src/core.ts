import { reactive } from 'vue';

/**
 * 按照指定长度数组对对象数组进行分组
 *
 * @param array 原始数组
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

export function useToggles<T>(...initialValues: T[]): [ (v: T) => boolean, (v: T) => void, () => boolean ] {
    // @ts-ignore
    const states: Set<T> = reactive(new Set<T>(initialValues))

    const has = (value: T) => states.has(value)

    const toggle = (value: T) => {
        states.has(value) ? states.delete(value) : states.add(value)
    }

    const empty = () => states.size === 0

    return [
        has,
        toggle,
        empty,
    ]
}
