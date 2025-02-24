import { useState } from "react";
import { Response } from "./types";
import { ResponseContext } from "./ResponseContext";

type ResponseProviderProps = {
  children: React.ReactNode;
};

export function ResponseProvider({ children }: ResponseProviderProps) {
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const value = {
    data,
    setData,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <ResponseContext.Provider value={value}>
      {children}
    </ResponseContext.Provider>
  );
}
