import { UTCDate } from '@date-fns/utc';
import { format } from 'date-fns';
import { randomInt, trimEnd } from 'es-toolkit';
import { padStart } from 'es-toolkit/compat';
import {
    v1 as uuid1,
    v3 as uuid3,
    v4 as uuid4,
    v5 as uuid5,
    v6 as uuid6,
    v7 as uuid7,
    type Version1Options,
    type Version4Options,
    type Version6Options,
    type Version7Options
} from 'uuid';
import { abs } from './math';

export class UUID {
    static readonly NCS = 0x00
    static readonly RFC_4122 = 0x80
    static readonly MICROSOFT = 0xC0
    static readonly FUTURE = 0xE0
    static readonly PATTERN = /^\{?(?:urn:uuid:)?([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})}?$/i

    /**
     * 大端字节序排列的字节集。
     */
    readonly bytes: Uint8Array

    /**
     * 大端字节序转换而成的二进制整数字符串。
     */
    readonly bits: string

    /**
     * 大端字节序转换而成的十进制整数。
     */
    readonly int: bigint

    /**
     * 不含任何符号的 Hex 字符串。
     *
     * - 会保持输入字符串的大小写。
     */
    readonly hex: string

    /**
     * `urn:uuid:########-####-####-####-############` 格式的 Hex 字符串。
     *
     * - 会保持输入字符串的大小写。
     */
    readonly urn: string

    /**
     * `########-####-####-####-############` 格式的 Hex 字符串。
     *
     * - 会保持输入字符串的大小写。
     */
    readonly string: string

    /**
     * UUID 的每一段 Hex。
     *
     * - 会保持输入字符串的大小写。
     * - 通过这个属性可以快速定位某一字节，而不必计算在整段 UUID 的第几位。
     * - `fields[0]` → `########-====-====-====-============`
     * - `fields[1]` → `========-####-====-====-============`
     * - `fields[2]` → `========-====-####-====-============`
     * - `fields[3]` → `========-====-====-####-============`
     * - `fields[4]` → `========-====-====-====-############`
     */
    readonly fields: [ string, string, string, string, string ]

    /**
     * UUID 种类。
     *
     * - 这个值决定了 UUID 的结构。
     */
    readonly variant: 0x00 | 0x80 | 0xC0 | 0xE0

    /**
     * RFC 9562 UUID 的版本号。
     *
     * - 当为 RFC 9562 UUID 时必定是 `number` 类型。
     * - 不为 RFC 9562 UUID 时必定是 `undefined` 。
     */
    readonly version?: number

    /**
     * 按纳秒计的 Unix 时间戳。
     *
     * - 当为 RFC 9562 UUIDv1、UUIDv2、UUIDv6、UUIDv7 时必定是 `bigint` 类型，否则必定是 `undefined` 。
     */
    readonly timestamp?: bigint

    /**
     * 时钟序号。
     *
     * - 使用大端字节序读取转换而来。
     * - 当为 RFC 9562 UUIDv1、UUIDv2、UUIDv6 时必定是 `number` 类型，否则必定是 `undefined` 。
     */
    readonly sequence?: number

    /**
     * 节点地址。
     *
     * - 当为 RFC 9562 UUIDv1、UUIDv2、UUIDv6 时必定是一个 Hex 字符串，否则必定是 `undefined` 。
     */
    readonly node?: string

    /**
     * 本地信息。
     *
     * - 当为 RFC 9562 UUIDv2 时必定是一个 Hex 字符串，否则必定是 `undefined` 。
     */
    readonly local?: string

    /**
     * 使用 UUID 的各个部分构造 UUID 对象。
     *
     * @param a `########-====-====-====-============`
     * @param b `========-####-====-====-============`
     * @param c `========-====-####-====-============`
     * @param d `========-====-====-####-============`
     * @param e `========-====-====-====-############`
     * @private
     */
    private constructor(a: string, b: string, c: string, d: string, e: string) {
        this.fields = [ a, b, c, d, e ]
        this.string = this.fields.join('-')
        this.hex = this.fields.join('')
        this.urn = `urn:uuid:${this.string}`
        this.int = BigInt(`0x${this.hex}`)
        this.bits = this.int.toString(2).padStart(128, '0')
        this.bytes = Uint8Array.from(this.hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
        this.variant = UUID.guessVariant(this.bytes[8]! >> 4)
        this.version = this.variant === UUID.RFC_4122 ? this.bytes[6]! >> 4 : undefined

        switch (this.version) {
            case 1:
                this.node = `0x${this.fields[4]}`
                this.sequence = Number(`0x${this.fields[3]}`) & 0x3FFF
                this.timestamp = -12219292800000000000n + 100n * BigInt(
                    [ '0x', this.fields[2].substring(1), this.fields[1], this.fields[0] ].join('')
                )
                break
            case 2:
                this.node = `0x${this.fields[4]}`
                this.local = `0x${this.fields[0]}`
                this.sequence = Number(`0x${this.fields[3]}`) & 0x3FFF
                this.timestamp = -12219292800000000000n + 100n * BigInt(
                    [ '0x', this.fields[2].substring(1), this.fields[1], '00000000' ].join('')
                )
                break
            case 6:
                this.node = `0x${this.fields[4]}`
                this.sequence = Number(`0x${this.fields[3]}`) & 0x3FFF
                this.timestamp = -12219292800000000000n + 100n * BigInt(
                    [ '0x', this.fields[0], this.fields[1], this.fields[2].substring(1) ].join('')
                )
                break
            case 7:
                this.timestamp = 1000000n * BigInt(
                    [ '0x', this.fields[0], this.fields[1] ].join('')
                )
                break
        }
    }

    /**
     * 按秒计的 Unix 时间戳（字符串）。
     *
     * - 与 {@link timestamp} 类型一致。
     */
    get timestampSeconds() {
        if (this.timestamp === undefined)
            return undefined
        const s = this.timestamp / 1000_000_000n
        const ns = trimEnd(abs(this.timestamp % 1000_000_000n).toString(), '0')
        return `${s}.${ns ? ns : '0'}`
    }

    /**
     * 当前时区下的时间，yyyy-mm-dd HH:MM:SS 并额外包含纳秒及时区。
     *
     * - 与 {@link timestamp} 类型一致。
     */
    get timeLocal() {
        if (this.timestamp === undefined)
            return undefined
        const s = this.timestamp / 1000_000_000n
        const ns = trimEnd(abs(this.timestamp % 1000_000_000n).toString(), '0')
        return format(new Date(Number(s * 1000n)), `yyyy-MM-dd HH:mm:ss.${ns ? ns : '0'} O`)
    }

    /**
     * UTC+0 下的时间，yyyy-mm-dd HH:MM:SS 并额外包含纳秒及时区。
     *
     * - 与 {@link timestamp} 类型一致。
     */
    get timeUTC() {
        if (this.timestamp === undefined)
            return undefined
        const s = this.timestamp / 1000_000_000n
        const ns = trimEnd(abs(this.timestamp % 1000_000_000n).toString(), '0')
        return format(new UTCDate(Number(s * 1000n)), `yyyy-MM-dd HH:mm:ss.${ns ? ns : '0'} O`)
    }

    /**
     * 解析任何满足正则表达式 {@link PATTERN} 的字符串。
     */
    static parse(text: string) {
        if (!text) return null
        const groups = text.match(UUID.PATTERN)
        if (!groups) return null
        const [ _, a, b, c, d, e ] = groups
        if (!a || !b || !c || !d || !e) return null
        return new UUID(a, b, c, d, e)
    }

    static v1(options?: Version1Options) {
        return UUID.parse(uuid1(options))!
    }

    static v2(data?: Uint8Array, options?: Version1Options) {
        if (data?.length === 4) {
            const a = [ ...data ].map(byte => padStart(byte.toString(16), 2, '0')).join('')
            const [ _, b, c, d, e ] = UUID.parse(uuid1(options))!.fields
            return new UUID(a, b, `2${c.substring(1)}`, d, e)
        } else {
            const a = padStart(randomInt(0xFFFFFFFF).toString(16), 8, '0')
            const [ _, b, c, d, e ] = UUID.parse(uuid1(options))!.fields
            return new UUID(a, b, `2${c.substring(1)}`, d, e)
        }
    }

    static v3(name: string, namespace: UUID | null) {
        if (!name || !namespace) return null
        return UUID.parse(uuid3(name, namespace.bytes))!
    }

    static v4(options?: Version4Options) {
        return UUID.parse(uuid4(options))!
    }

    static v5(name: string, namespace: UUID | null) {
        if (!name || !namespace) return null
        return UUID.parse(uuid5(name, namespace.bytes))!
    }

    static v6(options?: Version6Options) {
        return UUID.parse(uuid6(options))!
    }

    static v7(options?: Version7Options) {
        return UUID.parse(uuid7(options))!
    }

    /**
     * 猜测一个 UUID 的变种。
     *
     * @param flag 应当是 `========-====-====-#===-============` 位置的四个比特。
     * @return variant 必定是以下四个常量之一：{@link NCS}、{@link RFC_4122}、{@link MICROSOFT}、{@link FUTURE}
     */
    static guessVariant(flag: number) {
        if ((flag & 0b1000) === 0b0000)
            return UUID.NCS
        if ((flag & 0b1100) === 0b1000)
            return UUID.RFC_4122
        if ((flag & 0b1110) === 0b1100)
            return UUID.MICROSOFT
        if ((flag & 0b1110) === 0b1110)
            return UUID.FUTURE
        else
            return UUID.FUTURE
    }

    /**
     * 将 UUID 对象转换成 `########-####-####-####-############` 格式的 Hex 字符串。
     */
    toString() {
        return this.string
    }
}
