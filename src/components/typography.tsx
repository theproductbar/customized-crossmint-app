import { type VariantProps, cva } from "class-variance-authority"; // Importing types and function for managing variant styles
import type * as React from "react"; // Importing React types for type definitions

import { cn } from "../lib/utils"; // Importing a utility function for conditional class name concatenation

// Define typography variants using class-variance-authority
export const typographyVariants = cva("font-body transition-colors", {
  variants: {
    variant: {
      h1: "font-display text-4xl font-extrabold", // Styles for h1
      h2: "font-display text-2xl font-extrabold leading-7", // Styles for h2
      h3: "font-display text-xl font-extrabold leading-6", // Styles for h3
      h4: "font-body text-lg font-semibold leading-6", // Styles for h4
      h5: "font-body text-sm font-medium leading-6", // Styles for h5
      h6: "font-body text-xs font-medium", // Styles for h6
      tag: "font-body text-xs", // Styles for tag
      body: "font-body text-base", // Default styles for body text
    },
  },
  defaultVariants: {
    variant: "body", // Set default variant to "body"
  },
});

// Define the props for the Typography component
export type TypographyProps = React.HTMLAttributes<HTMLElement> & // Inherit HTML attributes for any element
  VariantProps<typeof typographyVariants> & {
    // Include variant props
    children: React.ReactNode; // Children to be rendered inside the component
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p"; // Optional tag prop to specify the HTML element
  };

// Typography component to render styled text
export function Typography({
  variant,
  tag,
  className,
  children,
  ...props
}: TypographyProps) {
  let Component: React.ElementType; // Declare a variable to hold the component type

  // Determine which component to render based on the tag or variant
  if (tag) {
    Component = tag; // Use the specified tag if provided
  } else {
    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        Component = variant; // Use the variant as the component type
        break;
      case "tag":
        Component = "span"; // Default to span for "tag" variant
        break;
      case "body":
      default:
        Component = "p"; // Default to paragraph for body text
    }
  }

  // Render the determined component with appropriate styles and props
  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    >
      {children} {/* Render the children inside the component */}
    </Component>
  );
}
