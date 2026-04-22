import { UTCDate } from '@date-fns/utc';
import { DurationLevel } from '@navifox/types';
import { format } from 'date-fns';
import { product } from './math';

export class Duration {
    static SCALES = [1000n, 1000n, 1000n, 60n, 60n, 24n, 365n];

    private parts: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    constructor(t: bigint, level?: DurationLevel) {
        let lefts = level == null ? t : t * product(Duration.SCALES.slice(0, level));
        Duration.SCALES.forEach((power, index) => {
            this.parts[index] = Number(lefts % power);
            lefts = lefts / power;
        });
        this.parts[DurationLevel.YEAR] = Number(lefts);
    }

    get year(): number {
        return this.parts[DurationLevel.YEAR]!;
    }

    set year(v: number) {
        this.parts[DurationLevel.YEAR] = v;
    }

    get day(): number {
        return this.parts[DurationLevel.DAY]!;
    }

    set day(v: number) {
        this.parts[DurationLevel.DAY] = v;
    }

    get hour(): number {
        return this.parts[DurationLevel.HOUR]!;
    }

    set hour(v: number) {
        this.parts[DurationLevel.HOUR] = v;
    }

    get minute(): number {
        return this.parts[DurationLevel.MINUTE]!;
    }

    set minute(v: number) {
        this.parts[DurationLevel.MINUTE] = v;
    }

    get second(): number {
        return this.parts[DurationLevel.SECOND]!;
    }

    set second(v: number) {
        this.parts[DurationLevel.SECOND] = v;
    }

    get millisecond(): number {
        return this.parts[DurationLevel.MILLISECOND]!;
    }

    set millisecond(v: number) {
        this.parts[DurationLevel.MILLISECOND] = v;
    }

    get microsecond(): number {
        return this.parts[DurationLevel.MICROSECOND]!;
    }

    set microsecond(v: number) {
        this.parts[DurationLevel.MICROSECOND] = v;
    }

    get nanosecond(): number {
        return this.parts[DurationLevel.NANOSECOND]!;
    }

    set nanosecond(v: number) {
        this.parts[DurationLevel.NANOSECOND] = v;
    }

    static fromDays(s: bigint) {
        return new Duration(s, DurationLevel.DAY);
    }

    static fromSeconds(s: bigint) {
        return new Duration(s, DurationLevel.SECOND);
    }

    static fromMilliseconds(ms: bigint) {
        return new Duration(ms, DurationLevel.MILLISECOND);
    }

    toSeconds() {
        const number = [
            [this.year, DurationLevel.YEAR],
            [this.day, DurationLevel.DAY],
            [this.hour, DurationLevel.HOUR],
            [this.minute, DurationLevel.MINUTE],
            [this.second, DurationLevel.SECOND],
        ]
            .map((v) => BigInt(v[0]!) * product(Duration.SCALES.slice(DurationLevel.SECOND, v[1])))
            .reduce((prev, curr) => prev + curr, 0n);
        const decimal =
            `${this.millisecond.toString().padStart(3, '0')}` +
            `${this.microsecond.toString().padStart(3, '0')}` +
            `${this.nanosecond.toString().padStart(3, '0')}`;

        return Number(`${number}.${decimal}`);
    }

    toMilliseconds() {
        const number = [
            [this.year, DurationLevel.YEAR],
            [this.day, DurationLevel.DAY],
            [this.hour, DurationLevel.HOUR],
            [this.minute, DurationLevel.MINUTE],
            [this.second, DurationLevel.SECOND],
            [this.millisecond, DurationLevel.MILLISECOND],
        ]
            .map((v) => BigInt(v[0]!) * product(Duration.SCALES.slice(DurationLevel.MILLISECOND, v[1])))
            .reduce((prev, curr) => prev + curr, 0n);
        const decimal =
            `${this.microsecond.toString().padStart(3, '0')}` + `${this.nanosecond.toString().padStart(3, '0')}`;

        return Number(`${number}.${decimal}`);
    }

    toUTCDate() {
        return new UTCDate(this.toMilliseconds());
    }

    toUTCDateString(fmt: string, _default: string) {
        try {
            return format(this.toUTCDate(), fmt);
        } catch {
            return _default;
        }
    }

    getLeadingZeroCount() {
        for (let i = this.parts.length; i > 0; i--) {
            if (this.parts[i]! > 0) return this.parts.length - i - 1;
        }
        return this.parts.length;
    }
}
