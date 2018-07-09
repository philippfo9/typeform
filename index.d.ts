export {};
declare global {
    interface String {
        replaceAll(this: string, search: string, replacement: string): string;
    }
}