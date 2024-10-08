export function secondsToTime(seconds: number): string {
    const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
    const min = zeroLeft(Math.floor(seconds / 60));
    const sec = zeroLeft(seconds % 60);
    return `${min}:${sec}`;
}
