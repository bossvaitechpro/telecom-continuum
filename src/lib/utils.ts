import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toRoman(num: number): string {
  const map: [number, string][] = [[6,'VI'],[5,'V'],[4,'IV'],[3,'III'],[2,'II'],[1,'I']];
  for (const [n, r] of map) if (num === n) return r;
  return String(num);
}
