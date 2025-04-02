import React, { useState } from "react";
import { Response } from "./types";
import { ResponseContext } from "./ResponseContext";

type ResponseProviderProps = {
  children: React.ReactNode;
};

export function ResponseProvider({ children }: ResponseProviderProps) {
  const [data, setData] = useState<Response | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const value = {
    data,
    setData,
    isLoading,
    setIsLoading,
    error,
    setError,
    fileUploaded,
    setFileUploaded,
  };

  return (
    <ResponseContext.Provider value={value}>
      {children}
    </ResponseContext.Provider>
  );
}
