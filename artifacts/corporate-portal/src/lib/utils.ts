import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://ailinc.onrender.com' : '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return baseUrl ? `${baseUrl.replace(/\/+$/, '')}${cleanPath}` : cleanPath;
}
