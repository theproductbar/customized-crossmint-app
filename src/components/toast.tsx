"use client"; // Indicates that this component is a client component in Next.js

import { cn } from "@/lib/utils"; // Importing a utility function for conditional class name concatenation
import * as ToastPrimitives from "@radix-ui/react-toast"; // Importing Radix UI Toast components
import { type VariantProps, cva } from "class-variance-authority"; // Importing types and function for managing variant styles
import { X } from "lucide-react"; // Importing the close icon from Lucide
import * as React from "react"; // Importing React library

// Provider component for the Toast context
const ToastProvider = ToastPrimitives.Provider;

// Component for the Toast Viewport
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> // Props for the Toast Viewport component
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref} // Forward the ref to the underlying component
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", // Styling for the viewport
      className // Allow additional class names to be passed
    )}
    {...props} // Spread any additional props onto the component
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName; // Set display name for debugging

// Variants for the Toast component using class-variance-authority
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground", // Default variant styles
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground", // Destructive variant styles
      },
    },
    defaultVariants: {
      variant: "default", // Set default variant to "default"
    },
  }
);

// Component for the Toast
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> // Props for the Toast component, including variants
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref} // Forward the ref to the underlying component
      className={cn(toastVariants({ variant }), className)} // Apply variant styles and any additional classes
      {...props} // Spread any additional props onto the component
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName; // Set display name for debugging

// Component for the Toast Action (e.g., buttons)
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> // Props for the Toast Action component
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref} // Forward the ref to the underlying component
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", // Styling for the action button
      className // Allow additional class names to be passed
    )}
    {...props} // Spread any additional props onto the component
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName; // Set display name for debugging

// Component for the Toast Close button
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> // Props for the Toast Close component
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref} // Forward the ref to the underlying component
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", // Styling for the close button
      className // Allow additional class names to be passed
    )}
    toast-close="" // Custom attribute for the close button
    {...props} // Spread any additional props onto the component
  >
    <X className="h-4 w-4" /> {/* Close icon */}
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName; // Set display name for debugging

// Component for the Toast Title
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> // Props for the Toast Title component
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)} // Styling for the title
    {...props} // Spread any additional props onto the component
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName; // Set display name for debugging

// Component for the Toast Description
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> // Props for the Toast Description component
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)} // Styling for the description
    {...props} // Spread any additional props onto the component
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName; // Set display name for debugging

// Type definitions for Toast props and ToastAction element
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

// Exporting components and types for use in other parts of the application
export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
