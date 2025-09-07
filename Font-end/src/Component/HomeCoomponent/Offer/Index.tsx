import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import OfferItemComponent from "../../CoomonComponent/OfferComponent/OfferItemComponent";
import {
  OfferBestSale,
  OfferFlashSale,
  OfferMewArrival,
  OfferTOPRated,
} from "../../../Helpers/DataProvider";

const Offer: React.FC = () => {
  return (
    <div>
      <Containere>
        <div className="flex flex-row justify-between py-18">
          {/* coloum 1 */}

          <div className="flex flex-col gap-4">
            <h3 className="text-gray-900 body-medium-600">FLASH SALE TODAY</h3>
            <div className=" flex flex-col gap-4">
              {OfferFlashSale.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>
          {/* coloum 1 */}
          {/* coloum 2 */}

          <div className="flex flex-col gap-4">
            <h3 className="text-gray-900 body-medium-600">BEST SELLERS</h3>
            <div className=" flex flex-col gap-4">
              {OfferBestSale.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>
          {/* coloum 2 */}
          {/* coloum 3 */}

          <div className="flex flex-col gap-4">
            <h3 className="text-gray-900 body-medium-600">TOP RATED</h3>
            <div className=" flex flex-col gap-4">
              {OfferTOPRated.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>
          {/* coloum 3 */}
          {/* coloum 4 */}

          <div className="flex flex-col gap-4">
            <h3 className="text-gray-900 body-medium-600">NEW ARRIVAL</h3>
            <div className=" flex flex-col gap-4">
              {OfferMewArrival.map((item) => (
                <OfferItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>
          {/* coloum 4 */}
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Offer);
