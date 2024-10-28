import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="bg-transparent absolute z-50 w-full text-white h-14 backdrop-blur-md shadow-lg">
      <div className="h-full flex items-center justify-between w-[80%] mx-auto">
        <Link to="/">
          <h2 className="font-medium md:text-lg">Resume Builder</h2>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
