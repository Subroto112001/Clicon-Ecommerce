import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { subcribeImage } from "../../../Helpers/DataProvider";

const Subscribe = () => {
  return (
    <div className="bg-secondary-700">
      <Containere>
        <div className="py-18">
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col justify-center items-center gap-3">
              <h3 className="heading1 text-gray-00">
                Subscribe to our newsletter
              </h3>
              <p className="body-medium-400 text-gray-100 max-w-[556px] text-center">
                Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
                libero et cursus. Donec non quam urna. Quisque vitae porta
                ipsum.
              </p>
            </div>

            <div className="flex flex-row justify-center items-center bg-gray-00 w-[624px] p-3">
              <input
                type="email"
                placeholder="Email address"
                className="body-medium-400 , text-gray-500 w-[424px] pl-4 py-3 bg-gray-00 outline-none"
              />
              <button className="w-[160px] h-[48px] heading5 bg-primary-500 text-gray-00 cursor-pointer">
                SUBSCRIBE
              </button>
            </div>

                      <div className="flex flex-row justify-center items-center gap-12">{subcribeImage.map((item) => (
                <div key={item.id}><img src={item.image} alt={item.image} /></div>
            ))}</div>
          </div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Subscribe);
