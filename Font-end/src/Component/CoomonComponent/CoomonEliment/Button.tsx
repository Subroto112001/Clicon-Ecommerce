import React from 'react'

import { icons } from '../../../Helpers/IconProvider';


 export const Button = ({ content }: { content: React.ReactNode }) => {
  return (
    <button className="px-[24px]! py-[14px]! bg-warning-500 hover:bg-warning-400 cursor-pointer transition-all rounded-[2px] text-black flex gap-1 justify-center items-center">
      {content} <span className="text-gray-900">{icons.rightarrow}</span>
    </button>
  );
};

export const SecondButton = ({ content }: { content: React.ReactNode }) => {
  return (
    <button className="px-[24px]! py-[14px]! bg-primary-500 hover:bg-primary-400 transition-all cursor-pointer rounded-[2px] text-black flex gap-1 justify-center items-center">
      {content} <span className="text-gray-900">{icons.rightarrow}</span>
    </button>
  );
};

