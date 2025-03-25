import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

import "./toaster.css";

import successIcon from "../assets/success.svg";
import errorIcon from "../assets/error.svg";
import infoIcon from "../assets/info.svg";
import warningIcon from "../assets/warning.svg";
import closeIcon from "../assets/close.svg";

type ToastType = "success" | "error" | "warning" | "info";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  timeoutId?: ReturnType<typeof setTimeout>;
  exiting?: boolean; // <<-- new property
}

interface ToasterContextType {
  (message: string, type?: ToastType, duration?: number): void;
}

const ToasterContext = createContext<ToasterContextType>(() => {});

interface ToasterProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
}

export const ToasterProvider: React.FC<ToasterProviderProps> = ({
  children,
  position = "top-right",
  duration = 3000,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const toastId = useRef(0);

  const addToast = (
    message: string,
    type: ToastType = "info",
    customDuration?: number
  ) => {
    const id = toastId.current++;
    const toastDuration = customDuration ?? duration;

    setToasts((prev) => [
      ...prev,
      { id, message, type, duration: toastDuration },
    ]);

    const timeout = setTimeout(() => removeToast(id), toastDuration);

    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, timeoutId: timeout } : toast
      )
    );
  };

  const removeToast = (id: number) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      if (toast && toast.timeoutId) clearTimeout(toast.timeoutId);
      // If not already exiting, mark it as exiting and schedule final removal
      if (toast && !toast.exiting) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300); // 300ms should match your CSS transition duration
        return prev.map((toast) =>
          toast.id === id ? { ...toast, exiting: true } : toast
        );
      }
      return prev;
    });
  };

  return (
    <ToasterContext.Provider value={addToast}>
      {children}
      <div
        className={`toaster-container ${position} ${isHovered ? "hover" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {toasts.map(({ id, message, type, exiting }) => (
          <ToastItem
            key={id}
            id={id}
            message={message}
            type={type}
            exiting={exiting} // <<-- new prop
            removeToast={removeToast}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

interface ToastItemProps {
  id: number;
  message: string;
  type: ToastType;
  removeToast: (id: number) => void;
  exiting?: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  message,
  type,
  removeToast,
  exiting,
}) => {
  const icons: Record<ToastType, string> = {
    success: successIcon,
    error: errorIcon,
    warning: warningIcon,
    info: infoIcon,
  };

  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const threshold = 2; // px threshold for removal

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || startX.current === null) return;
    const deltaX = e.clientX - startX.current;
    setDragX(deltaX);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (Math.abs(dragX) >= threshold) {
      removeToast(id);
    } else {
      setDragX(0);
    }
    isDraggingRef.current = false;
    startX.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [dragX, id, removeToast, threshold, handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDraggingRef.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Compute fade factor based on drag distance.
  const fade = 1 - Math.min(Math.abs(dragX) / threshold, 1);

  return (
    <div
      className={`toast toast-${type} ${exiting ? "exiting" : ""}`}
      style={{
        transform: `translateX(${dragX}px)`,
        opacity: isDraggingRef.current ? fade : 1,
        transition: isDraggingRef.current
          ? "none"
          : "transform 0.3s ease, opacity 0.3s ease",
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={() => isDraggingRef.current && handleMouseUp()}
    >
      <div className="toast-details">
        <img className="toast-icon" src={icons[type]} />
        <span className="toast-message">{message}</span>
      </div>
      <img
        src={closeIcon}
        className="toast-close"
        onClick={() => removeToast(id)}
      />
    </div>
  );
};

export const useToaster = () => useContext(ToasterContext);
