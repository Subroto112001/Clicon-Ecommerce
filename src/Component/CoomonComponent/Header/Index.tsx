
import Containere from '../Container/Containere'
import { assets } from "../../../Helpers/ImageProvider";
import Button from '../CoomonEliment/Button/Button';
import { icons } from '../../../Helpers/IconProvider';

export const Header = () => {
  return (
    <div className="bg-gray-900 py-3!">
      <Containere>
        <div className="grid grid-cols-3 ">
          <div className=" grid auto-cols-max grid-flow-col items-center gap-x-3">
            <img src={assets.Black} alt={assets.Black} />
            <h1 className="text-gray-00 heading3">Friday</h1>
          </div>
          <div className="grid grid-flow-col justify-center auto-cols-max items-center">
            <div className="grid auto-cols-max grid-flow-col items-center gap-x-1">
              <span className="body-small-500 text-gray-100">Up to</span>

              <h2 className="display4 text-warning-500">59%</h2>
              <span className="body-xl-600 text-gray-100">OFF</span>
            </div>
          </div>
          <div className="grid justify-end">
            <Button>
              <span>SHOP NOW</span>
              <span>{icons.rightarrow}</span>
            </Button>
          </div>
        </div>
      </Containere>
    </div>
  );
}
