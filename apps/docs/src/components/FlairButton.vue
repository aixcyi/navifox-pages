<script lang="ts" setup>
import { gsap } from 'gsap'
import { onMounted, type TemplateRef, useTemplateRef } from 'vue'

defineProps<{ use?: string, flairStyle?: string }>()

class ButtonFactory {
    readonly xSet: Function;
    readonly ySet: Function;
    readonly hasFill: boolean;

    constructor(readonly blockRef: TemplateRef<any>, readonly flairRef: TemplateRef<any>) {
        this.xSet = gsap.quickSetter(this.flair, 'xPercent');
        this.ySet = gsap.quickSetter(this.flair, 'yPercent');
        this.hasFill = this.block.classList.contains('button--fill');
        this.initEvents();
    }

    get block() {
        return this.blockRef.value
    }

    get flair() {
        return this.flairRef.value
    }

    getXY(event: MouseEvent) {
        const { left, top, width, height } =
            this.block.getBoundingClientRect();

        const xTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, width, 0, 100),
            gsap.utils.clamp(0, 100)
        );
        const yTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, height, 0, 100),
            gsap.utils.clamp(0, 100)
        );
        return {
            x: xTransformer(event.clientX - left),
            y: yTransformer(event.clientY - top)
        };
    }

    initEvents() {
        this.block.addEventListener('mouseenter', (e: MouseEvent) => {
            const { x, y } = this.getXY(e);

            this.xSet(x);
            this.ySet(y);

            if (this.hasFill) {
                gsap.to(this.flair, {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(this.flair, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });

        this.block.addEventListener('mouseleave', (e: MouseEvent) => {
            const { x, y } = this.getXY(e);

            gsap.killTweensOf(this.flair);

            if (this.hasFill) {
                gsap.to(this.flair, {
                    xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                    yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(this.flair, {
                    xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                    yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                    scale: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        this.block.addEventListener('mousemove', (e: MouseEvent) => {
            const { x, y } = this.getXY(e);

            gsap.to(this.flair, {
                xPercent: x,
                yPercent: y,
                duration: this.hasFill ? 1 : 0.4,
                ease: 'power2'
            });
        });
    }
}

const button = useTemplateRef('button')
const flair = useTemplateRef('flair')

onMounted(() => {
    new ButtonFactory(button, flair);
})
</script>


<template>
    <component :is="use ?? 'a'" ref="button" class="button button--stroke">
        <span ref="flair" :style="flairStyle" class="flair"></span>
        <span ref="label" class="label"><slot></slot></span>
    </component>
</template>


<style scoped>
.button {
    align-items: center;
    background: 0 0;
    border: none;
    border-radius: 6.25rem;
    color: var(--button-color);
    cursor: pointer;
    display: inline-flex;
    gap: .363636em;
    justify-content: center;
    letter-spacing: -.01em;
    line-height: 1.04545;
    overflow: hidden;
    padding: .9375rem 1.5rem;
    position: relative;
    text-decoration: none;

    @media (hover: hover) {
        &:hover {
            color: var(--button-hoverColor, var(--button-stroke));
        }
    }
}

.button--stroke::after {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    border: .175rem solid var(--button-stroke);
    border-radius: 6.25rem;
    content: "";
    pointer-events: none;
}

.button--stroke .flair {
    transform: scale(0);
    transform-origin: 0 0;
    will-change: transform;
}

.flair {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    &::before {
        position: absolute;
        left: 0;
        top: 0;
        aspect-ratio: 1;
        background: url(../assets/noise-button.png), var(--button-stroke);
        border-radius: 50%;
        content: "";
        display: block;
        pointer-events: none;
        transform: translate(-50%, -50%);
        width: 170%;
    }
}

.label {
    position: relative;
    text-align: center;
    transition: color 50ms var(--ease-in-out-quart);
    user-select: none;
}

@media (hover: hover) {
    .button.button--stroke:hover {
        color: var(--button-hoverColor, var(--button-stroke));
    }

    .button--stroke:hover .label {
        transition: color .15s var(--ease-in-out-quart);
    }
}
</style>
