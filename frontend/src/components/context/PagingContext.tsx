import { createContext } from "react";

type PagingContextType = {
  currentPage: string | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
};
export const PagingContext = createContext<PagingContextType>({
  currentPage: null,
  setCurrentPage: () => {},
});

