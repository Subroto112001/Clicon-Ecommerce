import React, { createContext, useContext, useEffect, useState } from "react";

// 1) Define types
interface Post {
  id: number;
  title: string;
  body: string;
}

interface AppContextType {
  posts: Post[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
}

// 2) Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// 3) Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setPosts(data.products); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <AppContext.Provider value={{ posts, loading, fetchPosts }}>
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside <AppProvider>");
  return context;
}