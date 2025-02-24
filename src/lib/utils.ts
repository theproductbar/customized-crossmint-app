import { type ClassValue, clsx } from "clsx"; // Importing ClassValue type and clsx function for conditional class name management
import { twMerge } from "tailwind-merge"; // Importing twMerge function to handle merging Tailwind CSS class names

/**
 * Combines multiple class names into a single string.
 *
 * This function takes various class name inputs, processes them to eliminate duplicates,
 * and ensures that the final output is a valid string of class names that can be applied to HTML elements.
 *
 * @param inputs - The class names to combine. This can include strings, objects, or arrays
 *                 that represent class names.
 * @returns The combined class names as a string, ensuring that any conflicting Tailwind classes
 *          are resolved correctly.
 */
export function cn(...inputs: ClassValue[]) {
    // Use clsx to combine class names and twMerge to handle any Tailwind CSS conflicts
    return twMerge(clsx(inputs));
}