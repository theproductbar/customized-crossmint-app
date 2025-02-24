"use client"; // Indicates that this component is a client component in Next.js

import { cn } from "@/lib/utils"; // Importing a utility function for conditional class name concatenation
import * as TabsPrimitive from "@radix-ui/react-tabs"; // Importing the Radix UI Tabs components
import * as React from "react"; // Importing React library

// Root component for the Tabs
const Tabs = TabsPrimitive.Root;

// Component for the Tabs List
const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>, // Type for the ref
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> // Props for the Tabs List component
>(({ className, ...props }, ref) => {
    // Render the Tabs List with additional styling
    return (
        <TabsPrimitive.List 
            ref={ref} // Forward the ref to the underlying component
            className={cn("h-14", className)} // Apply height and any additional classes
            {...props} // Spread any additional props onto the component
        />
    );
});
TabsList.displayName = TabsPrimitive.List.displayName; // Set display name for debugging

// Component for each Tab Trigger
const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>, // Type for the ref
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> // Props for the Tab Trigger component
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref} // Forward the ref to the underlying component
        className={cn(
            "inline-flex data-[state=active]:border-b-secondary-foreground border-b-2 border-b-border items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-muted text-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=active]:text-secondary-foreground",
            className // Apply styles and additional classes
        )}
        {...props} // Spread any additional props onto the component
    />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName; // Set display name for debugging

// Component for the Tabs Content
const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>, // Type for the ref
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> // Props for the Tabs Content component
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref} // Forward the ref to the underlying component
        className={cn(
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className // Apply styles and additional classes
        )}
        {...props} // Spread any additional props onto the component
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName; // Set display name for debugging

// Export the Tabs components for use in other parts of the application
export { Tabs, TabsList, TabsTrigger, TabsContent };