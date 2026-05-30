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
interface payload {
  user: string | null; // logged-in user id
  guestId: string | null; // guest session id
  product: string | null; // product id
  variant: string | null; // variant id (nullable)
  quantity: number;
  color: string;
  size: string;
  coupon: string | null;
}
// create a cart mutation
export const useCreateCartMutation = () => {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: payload) => {
      const response = await api.post("/cart/add-to-cart", payload);
      return response.data;
    },
  });
};

