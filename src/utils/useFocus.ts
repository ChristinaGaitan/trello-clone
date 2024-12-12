import { useRef, useEffect } from "react";

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null); // null marks the ref as readonly

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};
