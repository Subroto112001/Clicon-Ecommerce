import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { Introducingimage } from "../../../Helpers/ImageProvider";
import { motion } from "motion/react";
import { useBannerData, useProductsData } from "../../../Hooks/api-mutaion/api-mutation";
const Introducing: React.FC = () => {



 const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    isError: productsIsError,
  } = useProductsData();


 const banner = productsData?.data?.length - 1;
 const banner2 = productsData?.data?.length - 2;
console.log(productsData?.data[banner2].image[0].url);
  return (
    <div className="py-18">
      <Containere>
        <div className="grid grid-cols-2 justify-between items-center gap-x-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: false, amount: 0.1 }}
            className=" cursor-pointer relative"
          >
            <img
              src={productsData?.data[banner].image[0].url}
              alt="Introducing Product"
              className="w-full h-[400px]"
            />
            <div className=" flex flex-col  gap-[280px] absolute top-4 left-4">
              <p className="text-2xl font-bold text-gray-700">
                {productsData?.data[banner].name}
              </p>
              <button className=" w-30 h-10 bg-amber-400  cursor-pointer">
                Shop now
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: false, amount: 0.1 }}
            className=" cursor-pointer relative"
          >
            <img
              src={productsData?.data[banner2].image[0].url}
              alt="Introducing Product"
              className="w-full h-[400px]"
            />
            <div className=" flex flex-col  gap-[280px] absolute top-4 left-4">
              <p className="text-2xl font-bold text-gray-700">
                {productsData?.data[banner2].name}
              </p>
              <button className=" w-30 h-10 bg-amber-400  cursor-pointer">
                Shop now
              </button>
            </div>
          </motion.div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Introducing);
