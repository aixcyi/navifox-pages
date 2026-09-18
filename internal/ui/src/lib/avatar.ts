import type { Friend } from '@navifox/types';

const SHAPE_CLASSES: Record<NonNullable<Friend['avatarShape']>, string> = {
    square: '',
    circle: 'rounded-full',
    rounded: 'rounded-[25%]',
};

/**
 * 头像边框形状（{@link Friend.avatarShape}）对应的圆角类名。
 *
 * - 圆角统一按边长百分比取值，使同一形状在各种尺寸的头像（页脚 32px、友链页 64px）上比例一致；
 *   若写成 `rounded-2xl` 这类绝对值，小尺寸下圆角会占满半条边、被渲染成正圆。
 * - 未指定形状时按 {@link Friend.avatarShape} 的约定取 `square`。
 */
export function avatarShapeClass(shape: Friend['avatarShape']): string {
    return SHAPE_CLASSES[shape ?? 'square'];
}
