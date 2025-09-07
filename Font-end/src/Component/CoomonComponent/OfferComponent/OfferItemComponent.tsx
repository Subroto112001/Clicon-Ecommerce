import React from 'react'
import Camera from "../../../assets/Offer/Camera.png"
type OfferItemType = {
  item: {
    id: number;
    name: string;
    desc: string;
    price: string;
    image: string;
  };
};

const OfferItemComponent = ({ item }: OfferItemType) => {
  return (
    <div key={item.id} className="p-3 border border-gray-200 rounded flex flex-row justify-between items-center w-[312px] h-[104px] cursor-pointer hover:bg-gray-100 duration-300 transition-all">
      <div className="w-[80px] h-[80px]">
        <img src={item.image} alt={Camera} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="body-small-400 text-gray-900 truncate">{item.name}</h1>
          <h1 className="body-small-400 text-gray-900 truncate">
       {item.desc}
          </h1>
        </div>
        <p className="text-secondary-500 body-small-600">{item.price}</p>
      </div>
    </div>
  );
};

export default React.memo(OfferItemComponent);