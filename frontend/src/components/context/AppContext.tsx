import { createContext } from "react";

type PagingContextType = {
  currentPage: string | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
};
const PagingContext = {
  currentPage: null,
  setCurrentPage: () => {},
};

type DataContextType = {
  userName: string | null;
};
const DataContext = {
  userName: null,
};

type AppContextType = {
  pagingContext: PagingContextType;
  dataContext: DataContextType;
};

export const AppContext = createContext<AppContextType>({
  pagingContext: PagingContext,
  dataContext: DataContext,
});
