import { FaCaretLeft } from "react-icons/fa";
import image404 from "./404.png";
import { Link } from "react-router-dom";
import "./style.css";

const PageNotFound = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center h-100 w-100 mb-4">
        <div className=" d-flex align-items-center flex-column">
          <img src={image404} className="w-100" />
          <br />
          <Link to="/" className="btn btn-dark">
            <FaCaretLeft />
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
