"use client"; // This directive indicates that this file is client-side rendered in Next.js

// Importing utility function 'cn' for conditional classnames and the Radix UI Avatar components
import { cn } from "@/lib/utils"; // Utility for conditional classnames (likely a helper function)
import * as AvatarPrimitive from "@radix-ui/react-avatar"; // Importing Avatar components from Radix UI
import * as React from "react"; // Importing React to use hooks and other React features

/**
 * Avatar component that wraps Radix UI's Root Avatar component.
 * It provides a default structure for displaying an avatar.
 * This component can be used as a container for the avatar image or fallback.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>, // Type for the ref, corresponds to AvatarPrimitive.Root
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> // Type for the component's props
>(({ className, ...props }, ref) => (
  // Using Radix UI's Root Avatar component with a custom class and props
  <AvatarPrimitive.Root
    ref={ref} // Forwarding ref to the underlying AvatarPrimitive component
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Default avatar styling (flex, rounded, etc.)
      className // Additional classes passed via props
    )}
    {...props} // Spread the remaining props (e.g., 'src' or 'alt') to the AvatarPrimitive component
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName; // Setting displayName for better debugging (React component name)

/**
 * AvatarImage component that wraps Radix UI's Image Avatar component.
 * This component is used to display the actual image inside the Avatar container.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, // Type for the ref, corresponds to AvatarPrimitive.Image
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> // Type for the component's props
>(({ className, ...props }, ref) => (
  // Using Radix UI's Image Avatar component with a custom class and props
  <AvatarPrimitive.Image
    ref={ref} // Forwarding ref to the underlying AvatarPrimitive.Image
    className={cn("aspect-square h-full w-full", className)} // Ensures the image is square and fills the container
    {...props} // Spread the remaining props (e.g., 'src' or 'alt') to the AvatarPrimitive.Image component
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName; // Setting displayName for better debugging (React component name)

/**
 * AvatarFallback component that wraps Radix UI's Fallback Avatar component.
 * This component is used when the avatar image is not available (e.g., loading or broken image).
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, // Type for the ref, corresponds to AvatarPrimitive.Fallback
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> // Type for the component's props
>(({ className, ...props }, ref) => (
  // Using Radix UI's Fallback Avatar component with a custom class and props
  <AvatarPrimitive.Fallback
    ref={ref} // Forwarding ref to the underlying AvatarPrimitive.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Fallback styling (centered, rounded, muted background)
      className // Additional classes passed via props
    )}
    {...props} // Spread the remaining props (e.g., 'alt' text or fallback content) to the AvatarPrimitive.Fallback component
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName; // Setting displayName for better debugging (React component name)

/**
 * Exporting the three avatar components (Avatar, AvatarImage, AvatarFallback)
 * so that they can be used elsewhere in the app.
 */
export { Avatar, AvatarImage, AvatarFallback };
