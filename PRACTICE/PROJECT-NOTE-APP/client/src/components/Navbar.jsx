import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
const Navbar = () => {
  return (
    <header className="bg-blue-900 p-3">
      <div className="container flex justify-center">
        <div>
          <Link className="text-white" to={"/"}>
            Note App Logo{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
