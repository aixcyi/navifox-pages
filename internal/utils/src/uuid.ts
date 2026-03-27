export class UUID {
    static readonly NCS = 0b0000_0000
    static readonly RFC_4122 = 0b1000_0000
    static readonly MICROSOFT = 0b1100_0000
    static readonly FUTURE = 0b1110_0000
    static readonly PATTERN = /^\{?(?:urn:uuid:)?([0-9a-f]{8})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{4})-?([0-9a-f]{12})}?$/i

    readonly bytes: Uint8Array
    readonly bits: string
    readonly int: bigint
    readonly hex: string
    readonly urn: string
    readonly string: string
    readonly fields: string[]
    readonly variant: number
    readonly version: number | null

    private constructor(fields: string[]) {
        this.fields = fields
        this.string = fields.join('-')
        this.hex = fields.join('')
        this.urn = `urn:uuid:${this.string}`
        this.int = BigInt(`0x${this.hex}`)
        this.bits = this.int.toString(2).padStart(128, '0')
        this.bytes = Uint8Array.from(this.hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
        this.variant = UUID.guessVariant(this.bytes[8]! >> 4)
        this.version = this.variant === UUID.RFC_4122 ? this.bytes[6]! >> 4 : null
    }

    static parse(text: string) {
        if (!text) return null
        const groups = text.match(UUID.PATTERN)
        if (!groups) return null
        const [ _, ...fields ] = groups
        return new UUID(fields)
    }

    private static guessVariant(flag: number) {
        if ((flag & 0b1110) === 0b1110)
            return UUID.FUTURE
        if ((flag & 0b1100) === 0b1100)
            return UUID.MICROSOFT
        if ((flag & 0b1000) === 0b1000)
            return UUID.RFC_4122
        else
            return UUID.NCS
    }

    toString() {
        return this.string
    }
}
