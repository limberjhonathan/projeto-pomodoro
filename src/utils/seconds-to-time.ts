import { zeroLeft } from "./sero-left";

export function secondsToTime(seconds: number): string {
    const hours = zeroLeft((seconds / 3600))
    const min = zeroLeft(Math.floor(seconds / 60));
    const sec = zeroLeft(seconds % 60);
    return `${hours}:${min}:${sec}`;
}
