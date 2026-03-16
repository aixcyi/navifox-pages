import { reactive } from 'vue';

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
