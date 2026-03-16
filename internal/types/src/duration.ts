export const DurationLevel = {
    NANOSECOND: 0,
    MICROSECOND: 1,
    MILLISECOND: 2,
    SECOND: 3,
    MINUTE: 4,
    HOUR: 5,
    DAY: 6,
    YEAR: 7,
} as const

export type DurationLevel = typeof DurationLevel[keyof typeof DurationLevel]
