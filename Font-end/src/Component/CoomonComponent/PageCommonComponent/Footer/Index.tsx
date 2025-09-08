import React from "react";
import Containere from "../../Container/Containere";
import { assets, fotterImage } from "../../../../Helpers/ImageProvider";
import { useQuery } from "@tanstack/react-query";
import { GetFeatureProductCategory } from "../../../../Api/featuresProduct";
import { icons } from "../../../../Helpers/IconProvider";
import { footertag, fotterInfo } from "../../../../Helpers/DataProvider";
import { NavLink } from "react-router-dom";

const Footer = () => {
  interface Category {
    slug: string;
    name: string;
    url: string;
  }

  const {
    data: categorydata,

  } = useQuery<Category[]>({
    queryKey: ["feature-product-category"],
    queryFn: GetFeatureProductCategory,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return (
    <div className="bg-gray-900 py-[72px]">
      <Containere>
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_3fr] gap-[70px]">
          {/* colloum 1 */}
          <div className="flex flex-col gap-6">
            <div className="w-[177px] h-[48px]">
              <img
                src={assets.Logo}
                alt="footer log"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="body-small-400 text-gray-500">
                  Customer Supports:
                </h3>
                <h3 className="body-large-500 text-gray-00">(629) 555-0129</h3>
              </div>
              <p className="w-[248px] body-medium-400 text-gray-300">
                4517 Washington Ave. Manchester, Kentucky 39495
              </p>
              <p className="body-medium-500 text-gray-00">info@kinbo.com</p>
            </div>
          </div>
          {/* colloum 1 */}
          {/* colloum 2 */}
          <div className="flex flex-col gap-[18px]">
            <h3 className="label2 text-gray-00">Top Category</h3>

            <div className="flex flex-col  gap-y-4">
              <div className="flex flex-col gap-y-[]6px">
                {categorydata?.slice(0, 5).map((item: Category, index) => (
                  <span
                    key={index}
                    className={`body-small-400 capitalize text-gray-400  duration-300 transition-all  cursor-pointer `}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <span className="body-small-600 text-gray-600 hover:text-primary-500 duration-300 transition-all cursor-pointer">
                Browse All Products <span>{icons.rightarrow}</span>
              </span>
            </div>
          </div>
          {/* colloum 2 */}
          {/* colloum 3 */}
          <div className="flex flex-col gap-[18px]">
            <h3 className="label2 text-gray-00">QUICK LINKS</h3>
            <div className="flex flex-col gap-[6px]">
              {fotterInfo.map((item) => (
                <NavLink
                  to={item.path}
                  className="body-small-400 capitalize text-gray-400"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          {/* colloum 3 */}
          {/* colloum 4 */}
          <div className="flex flex-col gap-[18px]">
            <h3 className="label2 text-gray-00">QUICK LINKS</h3>

            <div className="flex flex-col gap-3">
              <div className="w-[176px] h-[69px]">
                <img
                  src={fotterImage.Playstore}
                  alt="Playstore"
                  className="w-[176px] h-[69px]"
                />
              </div>
              <div className="w-[176px] h-[69px]">
                <img
                  src={fotterImage.apple}
                  alt="Playstore"
                  className="w-[176px] h-[69px]"
                />
              </div>
            </div>
          </div>
          {/* colloum 4 */}
          {/* colloum 5 */}
          <div className="flex flex-col gap-[18px]">
            <h3 className="label2 text-gray-00">POPULAR TAGS</h3>

            <div className=" flex flex-wrap max-w-[312px] gap-2">
              {footertag.map((item) => (
                <span className="border border-gray-800 text-gray-00 body-small-500 p-2 rounded py-[6px] px-[12px] cursor-pointer hover:bg-gray-800 hover:border-gray-00 transition-all duration-300">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
          {/* colloum 5 */}
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Footer);
