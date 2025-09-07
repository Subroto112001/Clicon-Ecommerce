import React, { useEffect, useRef } from "react";
import Containere from "../../CoomonComponent/Container/Containere";
import { Introducingimage } from "../../../Helpers/ImageProvider";
import { motion } from "motion/react";
const Introducing: React.FC = () => {
  return (
    <div className="py-18">
      <Containere>
        <div className="grid grid-cols-2 justify-between items-center gap-x-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, amount: 0.4 }}
            className=" cursor-pointer"
          >
            <img
              src={Introducingimage.Leftside}
              alt={Introducingimage.Leftside}
              className="w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false, amount: 0.4 }}
            className=" cursor-pointer"
          >
            <img
              src={Introducingimage.Rightside}
              alt={Introducingimage.Rightside}
              className="w-full"
            />
          </motion.div>
        </div>
      </Containere>
    </div>
  );
};

export default React.memo(Introducing);
