declare module 'vite-plugin-eslint' {
    import type { Plugin } from 'vite';

    interface Options {
        eslintPath?: string;
        lintOnStart?: boolean;
        include?: string | string[];
        exclude?: string | string[];
        emitWarning?: boolean;
        emitError?: boolean;
        failOnWarning?: boolean;
        failOnError?: boolean;
    }

    export default function eslintPlugin(rawOptions?: Options): Plugin;
}
