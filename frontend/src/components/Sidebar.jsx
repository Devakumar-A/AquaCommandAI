import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">
        AquaCommandAI
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/" className="hover:text-yellow-300">
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/crop"
            className="hover:text-yellow-300"
          >
            Crop Recommendation
          </Link>
        </li>

        <li>
          <Link
            to="/yield"
            className="hover:text-yellow-300"
          >
            Yield Prediction
          </Link>
        </li>

        <li>
          <Link
            to="/water"
            className="hover:text-yellow-300"
          >
            Water Demand
          </Link>
        </li>

        <li>
          <Link
            to="/reservoir"
            className="hover:text-yellow-300"
          >
            Reservoir Monitor
          </Link>
        </li>

        <li>
          <Link
            to="/advisory"
            className="hover:text-yellow-300"
          >
            Advisory
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;