import { reactive } from 'vue';

/**
 * 创建多个带工具函数的开关。
 *
 * - 开关取决于内部是否包含指定的值，所以可以用任意值（哪怕是 `null` 和 `undefined`）来触发开关。
 */
export function useToggles<T>(...initialValues: T[]): [(v: T) => boolean, (v: T) => void, () => boolean] {
    // @ts-ignore
    const states: Set<T> = reactive(new Set<T>(initialValues));

    const has = (value: T) => states.has(value);

    const toggle = (value: T) => {
        if (states.has(value)) states.delete(value);
        else states.add(value);
    };

    const empty = () => states.size === 0;

    return [has, toggle, empty];
}
