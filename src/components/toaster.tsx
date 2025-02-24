"use client"; // Indicates that this component is a client component in Next.js

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"; // Importing various components for the toast notifications
import { useToast } from "./use-toast"; // Importing the hook to manage toast notifications

// Toaster component to display toast notifications
export function Toaster() {
  const { toasts } = useToast(); // Retrieve the current toasts from the useToast hook

  return (
    <ToastProvider>
      {" "}
      {/* Provider to manage the toast context */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        // Map over each toast to render it
        return (
          <Toast key={id} {...props}>
            {" "}
            {/* Render the Toast component with unique key */}
            <div className="grid gap-1">
              {" "}
              {/* Container for title and description */}
              {title && <ToastTitle>{title}</ToastTitle>}{" "}
              {/* Render title if it exists */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}{" "}
              {/* Render description if it exists */}
            </div>
            {action} {/* Render any action associated with the toast */}
            <ToastClose /> {/* Render the close button for the toast */}
          </Toast>
        );
      })}
      <ToastViewport /> {/* Render the viewport for the toasts to appear in */}
    </ToastProvider>
  );
}
