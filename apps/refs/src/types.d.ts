import type { Component } from 'vue';

declare module 'vue-router' {
    interface RouteMeta {
        title: string;
        description?: string;
        keywords?: string[];
        logo?: Component;
    }
}

export {};
