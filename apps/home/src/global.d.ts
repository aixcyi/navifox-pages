declare module "*.csv" {
    import friends from '#/friends.csv'
    import type { Friend } from '#/types'

    /** 友链表。 */
    export default friends as Friend[]
}
