import { zeroLeft } from "./sero-left";

export function secondsToMinutes(seconds: number): string {
    const min = zeroLeft(Math.floor(seconds / 60));
    const sec = zeroLeft(seconds % 60);
    return `${min}:${sec}`;
}
