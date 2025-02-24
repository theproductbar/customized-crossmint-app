"use client"; // Indicates that this component is a client component in Next.js

// Inspired by the react-hot-toast library
import * as React from "react"; // Importing React library

import type { ToastActionElement, ToastProps } from "./toast"; // Importing types for Toast components

const TOAST_LIMIT = 1; // Maximum number of toasts to display at once
const TOAST_REMOVE_DELAY = 1000000; // Delay before a toast is removed

// Define the type for the toast object
type ToasterToast = ToastProps & {
  id: string; // Unique identifier for the toast
  title?: React.ReactNode; // Optional title for the toast
  description?: React.ReactNode; // Optional description for the toast
  action?: ToastActionElement; // Optional action element (e.g., button)
};

// Define action types for the toast reducer
const actionTypes = {
  ADD_TOAST: "ADD_TOAST", // Action type to add a new toast
  UPDATE_TOAST: "UPDATE_TOAST", // Action type to update an existing toast
  DISMISS_TOAST: "DISMISS_TOAST", // Action type to dismiss a toast
  REMOVE_TOAST: "REMOVE_TOAST", // Action type to remove a toast from the state
} as const;

let count = 0; // Counter for generating unique toast IDs

// Function to generate a unique ID for each toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER; // Increment the counter and wrap around if necessary
  return count.toString(); // Return the counter as a string
}

// Define the action type
type ActionType = typeof actionTypes;

// Define the action interface
type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast; // The toast to be added
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>; // Partial update for an existing toast
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"]; // Optional ID for the toast to dismiss
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"]; // Optional ID for the toast to remove
    };

// Define the state structure
interface State {
  toasts: ToasterToast[]; // Array of current toasts
}

// Map to store timeouts for toast removal
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// Function to add a toast to the removal queue
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return; // Do not add if already in the queue
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId); // Remove from the timeout map
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId, // Dispatch remove action
    });
  }, TOAST_REMOVE_DELAY); // Set the delay for removal

  toastTimeouts.set(toastId, timeout); // Store the timeout
};

// Reducer function to manage the toast state
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT), // Add new toast and limit the count
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ), // Update specific toast
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Side effects to handle toast dismissal
      if (toastId) {
        addToRemoveQueue(toastId); // Add to removal queue if ID is provided
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id); // Add all to the removal queue
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // Mark as closed
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [], // Clear all toasts if no ID is provided
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId), // Remove specific toast by ID
      };
  }
};

// Array of listeners to subscribe to state changes
const listeners: Array<(state: State) => void> = [];

// Initial state of the toasts
let memoryState: State = { toasts: [] };

// Dispatch function to update state and notify listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action); // Update state
  listeners.forEach((listener) => {
    listener(memoryState); // Notify all listeners of the new state
  });
}

// Type for the toast without the ID
type Toast = Omit<ToasterToast, "id">;

// Main toast function to create new toasts
function toast({ ...props }: Toast) {
  const id = genId(); // Generate a unique ID for the toast

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id }, // Dispatch update action
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id }); // Dispatch dismiss action

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true, // Mark toast as open
      onOpenChange: (open) => {
        if (!open) dismiss(); // Dismiss if closed
      },
    },
  });

  return {
    id: id, // Return the toast ID
    dismiss, // Return the dismiss function
    update, // Return the update function
  };
}

// Custom hook to use toast notifications
function useToast() {
  const [state, setState] = React.useState<State>(memoryState); // State for current toasts

  React.useEffect(() => {
    listeners.push(setState); // Add the current state setter to listeners
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1); // Remove the listener on unmount
      }
    };
  }, [state]);

  return {
    ...state, // Return current state
    toast, // Return the toast function
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Return dismiss function
  };
}

// Exporting the useToast hook and toast function for use in other components
export { useToast, toast };
