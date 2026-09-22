import { addDays, differenceInDays, startOfWeek } from 'date-fns';

export { format, isValid, parse } from 'date-fns';

/**
 * 按本地时区构造日期。
 *
 * - `Date` 的月份从 `0` 开始，而日常书写用 `1` 表示一月，这里做一次换算。
 * - 需要区分同一天的先后时，把时分一并传入。
 *
 * @param year 年份。
 * @param month 月份，用 `1` 表示一月。
 * @param day 日期。
 * @param hours 小时。
 * @param minutes 分钟。
 */
export function newDate(year: number, month: number, day: number, hours = 0, minutes = 0): Date {
    return new Date(year, month - 1, day, hours, minutes);
}

/**
 * 距今的相对天数标签。
 *
 * - 依次给出「今天」「昨天」「前天」「本周」「上周」「当年今日」，更早则给出「N 天前」。
 * - 一周以周一为起点，与 {@link https://date-fns.org date-fns} 的默认周起始日不同。
 *
 * @param value 日期，缺省时返回空字符串。
 * @param now 参照时间，默认取当前时间。
 */
export function beforeLabel(value?: Date, now: Date = new Date()): string {
    if (!value) return '';
    const days = differenceInDays(now, value);
    if (days <= 0) return '今天';
    if (days === 1) return '昨天';
    if (days === 2) return '前天';
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
    const lastWeekStart = startOfWeek(addDays(now, -7), { weekStartsOn: 1 });
    if (value >= thisWeekStart) return '本周';
    if (value >= lastWeekStart) return '上周';
    if (
        value.getFullYear() !== now.getFullYear() &&
        value.getMonth() === now.getMonth() &&
        value.getDate() === now.getDate()
    ) {
        return '当年今日';
    }
    return `${days} 天前`;
}
