import React from 'react'



type propType = {
    children: React.ReactNode;
    className?: string
};
const Search: React.FC<propType> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Search