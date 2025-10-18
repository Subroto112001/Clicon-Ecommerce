import React from "react";
import { Staricon } from "../../../Helpers/IconProvider";


const Star: React.FC<{ rating?: number }> = ({ rating = 4.5 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
      if (rating >= index + 1) {
        
      return (
        <span key={index} className="text-yellow-400">
          {Staricon.Fullstar}
        </span>
      );
    
    } else if (rating >= index + 0.5) {
      return <span key={index} className="text-yellow-400" >{Staricon.Halfstar}</span>;
      
    } else {
      return <span key={index} className="text-yellow-400" >{Staricon.Blankstar}</span>;
    }
  });
  return <div className="flex gap-1">{stars}</div>;
};

export default React.memo(Star);
