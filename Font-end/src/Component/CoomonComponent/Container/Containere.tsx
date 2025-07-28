import React from 'react'

type containerProps = {
  children : React.ReactNode
};

const Containere : React.FC<containerProps> = ({ children }) => {
    return <div className='container'>{children}</div>
};

export default Containere