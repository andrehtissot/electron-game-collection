declare module 'csvwriter' {
    type csvwriterCallback = (err: string, csv: string) => void

    export default function csvwriter(grid: object[], callback: csvwriterCallback): void
}
