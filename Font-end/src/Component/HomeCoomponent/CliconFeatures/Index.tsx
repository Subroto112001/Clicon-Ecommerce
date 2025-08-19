import React from "react";
import Containere from "../../CoomonComponent/Container/Containere";

import { icons } from "../../../Helpers/IconProvider";

// decliar here type of cliconfeatures
type FeatureInformation = {
  id: number;
  icons: React.ReactNode;
  title: string;
  description: string;
};

// features information holder
const CliconFeatures = () => {
  const featuresInformation: FeatureInformation[] = [
    {
      id: 1,
      icons: icons.delivery,
      title: "Fasted Delivery",
      description: "Delivery in 24/H",
    },
    {
      id: 2,
      icons: icons.trophy,
      title: "24 Hours Return",
      description: "100% money-back guarantee",
    },
    {
      id: 3,
      icons: icons.creditcard,
      title: "Secure Payment",
      description: "Your money is safe",
    },
    {
      id: 4,
      icons: icons.support,
      title: "Support 24/7",
      description: "Live contact/message",
    },
  ];
  return (
    <div>
      <Containere>
        <div className="p-[32px]! border rounded-[6px] border-gray-100 flex flex-row  justify-between">
          {featuresInformation.map((items) => (
            <div className="flex flex-row gap-4">
              <span className="text-[40px]">{items.icons}</span>
              <div className="flex flex-col gap-1">
                <h3 className="label3 text-gray-900">{items.title}</h3>
                <p className="body-small-400 text-gray-600">
                  {items.description}
                </p>
              </div>
              {items.id < 4 ? (
                <span className="h-full w-[1px] border border-gray-100 ml-[44px]!"></span>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(CliconFeatures) || CliconFeatures;
