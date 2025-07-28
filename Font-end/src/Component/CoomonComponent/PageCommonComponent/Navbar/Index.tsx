
import Containere from '../../Container/Containere';
import { icons } from '../../../../Helpers/IconProvider';
import { useState } from 'react';
const TopNavbar = () => {

  const [topnavIcon] = useState([
    icons.twitter,
    icons.facebook,
    icons.pinterest,
    icons.Reddit,
    icons.youtube,
    icons.instagram
  ])
  return (
    <div className="bg-secondary-700 py-3!">
      <Containere>
        <div className="grid grid-cols-2">
          <h3 className="body-small-400 text-gray-00 ">
            Welcome to Clicon online eCommerce store.
          </h3>
          <div className="grid justify-end items-center">
            <div className="body-small-400 text-gray-00 grid  auto-cols-max grid-flow-col gap-x-3 items-center">
              <h3>Fllow us:</h3>
              <div className='grid grid-cols-6 gap-2'>
                {topnavIcon?.map((iconitem, index) => (
                  <span key={index} className='cursor-pointer hover:text-warning-400 transition-all hover:scale-110'>{iconitem}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Containere>
    </div>
  );
}

export default TopNavbar;