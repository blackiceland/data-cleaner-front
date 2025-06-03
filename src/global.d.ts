interface GoogleScriptRun {
    withSuccessHandler(handler: (arg: unknown) => void): GoogleScriptRun;
    withFailureHandler(handler: (arg: unknown) => void): GoogleScriptRun;
    getActiveRangeValues(): void;
}

interface GoogleScript {
    run: GoogleScriptRun;
}

interface GoogleGlobal {
    script: GoogleScript;
}

declare namespace NodeJS {
    interface ImportMetaEnv {
        readonly VITE_API_BASE_URL: string;
        readonly VITE_AUTH0_DOMAIN: string;
        readonly VITE_AUTH0_CLIENT_ID: string;
        readonly VITE_AUTH0_AUDIENCE: string;
    }
}

declare interface Window {
    parent: Window & { google?: GoogleGlobal };
}
