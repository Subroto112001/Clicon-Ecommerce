import React from 'react'
import Containere from '../Component/CoomonComponent/Container/Containere'
import BreadCrumb from '../Component/CoomonComponent/BreadCrumb/BreadCrumb'

const Shop = () => {
  return (
    <div>
      <div className="py-6 bg-gray-100">
        <Containere>
          <BreadCrumb />
        </Containere>
      </div>
      <Containere>
        <div></div>
      </Containere>
    </div>
  );
}

export default Shop