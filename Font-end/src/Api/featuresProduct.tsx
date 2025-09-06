export const GetfeaturesProduct = async () => {
  try {
    const data = await fetch("https://dummyjson.com/products").then((res) =>
      res.json()
    );

    return data;
  } catch (error) {
    console.log("Error from features Product", error);
  }
};

interface Category {
  slug: string;
  name: string;
  url: string;
}

export const GetFeatureProductCategory = async (): Promise<Category[]> => {
  try {
    const category: Category[] = await fetch(
      "https://dummyjson.com/products/categories"
    ).then((res) => res.json());
    return category;
  } catch (error) {
    console.log("Error from Features Category", error);
    return []; // fallback
  }
};

// prodcut by category
export const GetProductByCCategory = async (
  CategoryName: string
): Promise<any> => {
  try {
    const categoryByProduct = await fetch(
      `https://dummyjson.com/products/category/${CategoryName}`
    ).then((res) => res.json());
    return categoryByProduct;
  } catch (error) {
    console.log("Error from features CategoryByProduct", error);
  }
};
