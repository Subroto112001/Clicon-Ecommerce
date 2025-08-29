import React from 'react'
import Containere from '../../CoomonComponent/Container/Containere';
import { featureProductImage } from '../../../Helpers/ImageProvider';
import { Button } from '../../CoomonComponent/CoomonEliment/Button';

const FeaturedProduct: React.FC= () => {
  return (
    <div>
      <Containere>
        <div className="grid grid-cols-[1fr_3fr] gap-5">
          <div className=" bg-warning-300">
            <div className="!py-[32px] !px-[18px] flex flex-col justify-center items-center gap-2">
              <h3 className="body-small-600 text-danger-600">
                COMPUTER & ACCESSORIES
              </h3>
              <h3 className="heading1 text-gray-900">32% Discount</h3>
              <p className="body-small-400 text-gray-400">
                For all ellectronics products
              </p>
              <div className="flex flex-row gap-1 items-center justify-center">
                <span className="body-small-500 text-gray-900">
                  Offers ends in:
                </span>
                <button className="!py-1.5 !px-3 bg-white rounded body-small-600 text-gray-900">
                  ENDS OF CHRISTMAS
                </button>
              </div>
              <div className='mt-5!'>
                <Button content={"SHOP NOW"} />
              </div>
            </div>
            <div>
              <img src={featureProductImage.Featured} alt="Featured Banner" />
            </div>
          </div>
          <div className=" bg-gray-700">dsf</div>
        </div>
      </Containere>
    </div>
  );
}

export default FeaturedProduct;