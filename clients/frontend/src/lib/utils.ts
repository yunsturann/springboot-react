import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChangeEvent } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    .replace(/\s+/g, "")
    .replace(/[&='_+\-<>[\]{}|;^%*!]/g, "")
    .replace(/\.{2,}/g, "")
    .replace(/[^a-zA-Z0-9!@#%^()=+`~\\]/g, "");
};
