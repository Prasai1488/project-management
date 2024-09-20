import { FaCaretLeft } from "react-icons/fa";
import image404 from "./Group.png";
import { Link } from "react-router-dom";
import "./style.css";

const PageNotFound = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center h-100 w-100 mb-4">
        <div className=" d-flex align-items-center flex-column">
          <div className="pagenotfound-page">
            <div className="head-404">
              <h1>4</h1>
            </div>
            <div>
              <img src={image404} className="w-100" />
            </div>
            <div className="head-404">
              <h1>4</h1>
            </div>
          </div>
          <div className="boo-page">
            <h1>Boo! Page missing!</h1>
          </div>
          <div className="woops-page">
            <h2>Whoops! This page must be a ghost - it's not here!</h2>
          </div>
          <Link to="/">
            <button className="reload-btn">Reload</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
