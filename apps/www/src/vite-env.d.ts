/// <reference types="vite/client" />


// https://cn.vitejs.dev/guide/env-and-mode.html

declare const __APP_VERSION__: string;

interface ImportMetaEnv {
    readonly VITE_ICP_NO: string;
    readonly VITE_ICP_REF: string;
    readonly VITE_MPS_NO: string;
    readonly VITE_MPS_REF: string;
    readonly VITE_MOE_NO: string;
    readonly VITE_MOE_REF: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
