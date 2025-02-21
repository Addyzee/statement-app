import { createContext } from "react";

type PagingContextType = {
  currentPage: string | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
};
const PagingContext = {
  currentPage: null,
  setCurrentPage: () => {},
};


type UserContextType = {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext: UserContextType = {
  userName: null,
  setUserName: () => {},
};

type DataContextType = {
    userContext: UserContextType
}

const DataContext = {
    userContext: UserContext
}

type AppContextType = {
  pagingContext: PagingContextType;
  dataContext: DataContextType;
};

export const AppContext = createContext<AppContextType>({
  pagingContext: PagingContext,
  dataContext: DataContext,
});
