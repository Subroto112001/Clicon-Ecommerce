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
// product data fetch
export const useProductsDataAll = () => {
  return useQuery({
    queryKey: ["getAllProductsWithoutVariation"],
    queryFn: async () => {
      const response = await api.get(
        `/product/getall-Product-without-variation`
      );
      return response.data;
    },
  });
};

// get single product data fetch
export const useSingleProductData = (slug: string) => {
  return useQuery({
    queryKey: ["getSingleProduct", slug],
    queryFn: async () => {
      const response = await api.get(`/product/getSingle-Product/${slug}`);
      return response.data;
    },
   
  });
};

// create a cart mutation
export const useCreateCartMutation = (values) => {
   const queryClient = useQueryClient();
 return useMutation({
   mutationFn: async (values) => {
     const response = await api.post("/cart/add-to-cart", values);
     return response.data;
   },
 });
};

