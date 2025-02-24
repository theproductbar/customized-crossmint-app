import { cn } from "@/lib/utils"; // Importing a utility function for conditional class names

// Skeleton component for loading placeholders
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    // Render a div with animated pulse effect and skeleton background
    return (
        <div 
            className={cn("animate-pulse bg-skeleton", className)} // Combine base classes with any additional classes passed as props
            {...props} // Spread any additional props onto the div
        />
    );
}

// Export the Skeleton component for use in other parts of the application
export { Skeleton };