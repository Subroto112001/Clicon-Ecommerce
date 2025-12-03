import React, { createContext, useContext, useEffect, useState } from "react";

// 1) Define types
interface Post {
  id: number;
  title: string;
  body: string;
}

interface AppContextType {
  posts: Post[];
  category: string[];
  loading: boolean;
  categorybydata: Post[];
  fetchPosts: () => Promise<void>;
  fetchCategory: () => Promise<void>;
  selectedCategoryName: string;
  fetchProductByCategory: ({
    categoryname,
  }: {
    categoryname: string;
  }) => Promise<void>;
  localCategory: string;
}

// 2) Create Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// 3) Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setcategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categorybydata, setCategorybydata] = useState<Post[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("All Products"); // Add this
  const [localCategory, setLocalCategory] = useState<string>("");
  // product
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setPosts(data.products);
        setCategorybydata([]);
       setSelectedCategoryName("All Products");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // category
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      setcategory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const fetchLocalCategory = async () => { 
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/category/get-allCategory`
      );
      const data = await res.json();
      setLocalCategory(data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  // product by category
  const fetchProductByCategory = async ({
    categoryname,
  }: {
    categoryname: string;
  }) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products/category/${categoryname}`
      );
      const data = await res.json();

      setCategorybydata(data.products); // Correctly set the 'products' array from the response
      setSelectedCategoryName(categoryname);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run initial fetches
  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchLocalCategory();
  }, []);


  

  return (
    <AppContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
        category,
        fetchCategory,
        categorybydata,
        fetchProductByCategory,
        selectedCategoryName,
        localCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside <AppProvider>");
  return context;
}
