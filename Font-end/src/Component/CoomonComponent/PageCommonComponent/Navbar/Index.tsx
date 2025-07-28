
import Containere from '../../Container/Containere';

const Navbar = () => {
  return (
    <div className="bg-secondary-700">
      <Containere>
        <div className="grid grid-cols-2">
          <h3 className="body-small-400 text-gray-00 ">
            Welcome to Clicon online eCommerce store.
          </h3>
          <div className="body-small-400 text-gray-00">Fllow us:</div>
        </div>
      </Containere>
    </div>
  );
}

export default Navbar