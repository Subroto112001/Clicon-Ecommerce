import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

// category data fetch
export const useCategoryData = () => {
 return useQuery({
   queryKey: ["getAllCategories"],
   queryFn: async () => {
     const response = await api.get("/category/get-allCategory");
     return response.data;
   },
 
 });
};


// banner data fetch
export const useBannerData = () => {
  return useQuery({
    queryKey: ["getAllBanners"],
    queryFn: async () => {
      const response = await api.get("/banner/get-all-banner");
      return response.data;
    },
   
  });
};

// product data fetch
export const useProductsData = (type = "single") => {
  return useQuery({
    queryKey: ["getAllProducts", type],
    queryFn: async () => {
      const response = await api.get(`/product/getall-Product?type=${type}`);
      return response.data;
    },
  });
};