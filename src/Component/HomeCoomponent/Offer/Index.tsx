import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import OfferItemComponent from "../../CoomonComponent/OfferComponent/OfferItemComponent";
import {
  OfferBestSale,
  OfferFlashSale,
  OfferMewArrival,
  OfferTOPRated,
} from "../../../Helpers/DataProvider";
import { motion } from "motion/react";


const Offer: React.FC = () => {
  return (
    <div>
      <Containere>
        <div className="flex flex-row justify-between py-18">
          {/* coloum 1 */}

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            viewport={{ once: false, amount: 0.1 }}
          
            className="flex flex-col gap-4"
          >
            <h3 className="text-gray-900 body-medium-600">FLASH SALE TODAY</h3>

            <div className=" flex flex-col gap-4">
              {OfferFlashSale.map((item) => (

                <OfferItemComponent key={item.id} item={item} />
             
             ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-gray-900 body-medium-600">BEST SELLERS</h3>
            <div className=" flex flex-col gap-4">
              {OfferBestSale.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </motion.div>

          {/* coloum 2 */}
          {/* coloum 3 */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col gap-4!"
          >
            <h3 className="text-gray-900 body-medium-600">TOP RATED</h3>
            <div className=" flex flex-col gap-4">
              {OfferTOPRated.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
          {/* coloum 3 */}
          {/* coloum 4 */}

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col gap-4!"
          >
            <h3 className="text-gray-900 body-medium-600">NEW ARRIVAL</h3>
            <div className=" flex flex-col gap-4">
              {OfferMewArrival.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
          {/* coloum 4 */}
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Offer);
