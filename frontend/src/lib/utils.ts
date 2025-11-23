import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Enhanced utility functions for FHE application
export function formatEncryptedValue(value: string): string {
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function validateMoodRange(mood: number): boolean {
  return mood >= 1 && mood <= 5;
}

export function validateHabitRange(habit: number): boolean {
  return habit >= 0 && habit <= 100;
}