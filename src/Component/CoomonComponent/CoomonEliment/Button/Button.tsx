import React from 'react'

const Button = ({ children }: { children : React.ReactNode}) => {
  return (
    <button className="flex flex-row justify-center items-center gap-1.5 bg-warning-500 px-[24px] py-[14px]">
      {children}
    </button>
  );
};

export default Button