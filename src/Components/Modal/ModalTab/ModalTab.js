import { useEffect, useRef } from "react";
import "./style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";

const ModalTab = (props) => {
  // const parent = useRef(null);
  // useEffect(() => {
  //   parent.current && autoAnimate(parent.current);
  // }, [parent]);
  const { children, value, index, tab, ...other } = props;
  return (
    <div
      className="tab-pane show active"
      id={tab}
      role="tabpanel"
      ara-aria-labelledby={`${tab}-tab`}
      {...other}
      // ref={parent}
    >
      {value === index && <>{children}</>}
    </div>
  );
};
export default ModalTab;
