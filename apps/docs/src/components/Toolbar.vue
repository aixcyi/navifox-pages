<template>
    <!-- 右上角工具栏：透明容器，不设底色与边框，仅为后续工具预留位置。
         外层铺满整行但放行指针事件，只有内层工具本身可点。 -->
    <div class="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-end p-3 sm:p-4">
        <div class="pointer-events-auto flex items-center gap-2">
            <slot />
        </div>
    </div>
</template>
