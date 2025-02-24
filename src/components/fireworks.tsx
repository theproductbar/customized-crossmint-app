// Importing utility functions and React hooks
import { cn } from "@/lib/utils"; // Utility function for conditionally joining class names
import { useEffect, useState } from "react"; // React hooks to manage component state and side effects

// Fireworks component which renders a fireworks animation
export const Fireworks = ({ className }: { className?: string }) => {
  // isPlaying state to track whether the fireworks are active (playing)
  const [isPlaying, setIsPlaying] = useState(true);

  // useEffect hook to trigger fireworks animation for 5 seconds
  useEffect(() => {
    setIsPlaying(true); // Set isPlaying to true when component mounts
    const timer = setTimeout(() => {
      setIsPlaying(false); // After 5 seconds, set isPlaying to false (stopping the fireworks)
    }, 5000); // 5 seconds is the duration of the fireworks animation
    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs once on mount

  // If fireworks have completed (isPlaying is false), return null (don't render anything)
  if (!isPlaying) {
    return null;
  }

  // Render fireworks gif for 5 seconds
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Centering the fireworks gif on the screen */}
      <div className="flex place-content-center pt-28">
        {/* Fireworks gif */}
        <img
          src="/fireworks.gif"
          alt="fireworks"
          className={cn("max-w-full md:max-w-[600px]", className)}
          // The `className` allows custom styles to be passed in, e.g., to adjust size
        />
      </div>
    </div>
  );
};
