/// <reference types="vite/client" />

// https://cn.vitejs.dev/guide/env-and-mode.html

declare const __APP_VERSION__: string;

interface ImportMetaEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// qrcode 包未内置类型声明，此处仅声明本项目用到的接口
declare module 'qrcode' {
    interface QRCodeToDataURLOptions {
        width?: number;
        color?: { light?: string; dark?: string };
    }
    const QRCode: {
        toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>;
    };
    export default QRCode;
}
