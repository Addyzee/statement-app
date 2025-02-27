import React, { useEffect, useState } from "react";
import { Response } from "./types";
import { ResponseContext } from "./ResponseContext";
import Data from "../Analysis/Data.json";

type ResponseProviderProps = {
  children: React.ReactNode;
};

export function ResponseProvider({ children }: ResponseProviderProps) {
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => setData(Data), [data]);

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
