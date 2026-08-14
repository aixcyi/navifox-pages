/**
 * Vite 8 的 vite/client 不再内置 "*.vue" 模块声明，
 * 纯 tsc 检查时需要自行声明（Vue 官方脚手架 env.d.ts 的同款写法）。
 */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
    export default component;
}
