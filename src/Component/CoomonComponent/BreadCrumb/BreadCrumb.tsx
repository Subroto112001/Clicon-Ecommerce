import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
const BreadCrumb = () => {
  const { pathname } = useLocation();
  let pathnameArray = pathname.split("/").filter((path) => path);

  let BreadCrumbPath = "";
  return (
    <div className="py-4 flex flex-row gap-2 items-center">
      <span className="inline-block">
        <Link to={"/"}>
          <div className="flex flex-row justify-center items-center gap-1.5 text-xl">
            <span className="">
              <AiOutlineHome />
            </span>
            <span>Home</span>
          </div>
        </Link>
      </span>
      {pathnameArray?.map((name, index) => {
        BreadCrumbPath += `/${name}`;
        const isLast = index === pathnameArray?.length - 1;
        return isLast ? (
          <div
            className="flex flex-row items-center gap-1.5  text-xl"
            key={index}
          >
            <span className="text-lg">
              <MdArrowForwardIos />
            </span>
            <span className="text-gray-500 uppercase" key={index}>
              {name}
            </span>
          </div>
        ) : (
          <div key={index} className="flex flex-row items-center text-xl gap-1.5">
            <span className="text-lg">
              <MdArrowForwardIos />
            </span>
            <span>
              <Link className="" to={BreadCrumbPath}>
                {name}
              </Link>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
