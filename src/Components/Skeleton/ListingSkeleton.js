import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const ListingSkeleton = () => {
  const [skeletonCount, setSkeletonCount] = useState(3);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setScreenWidth(640);
        setSkeletonCount(1);
      } else if (window.innerWidth <= 1150) {
        setScreenWidth(900);
        setSkeletonCount(3);
      } else if (window.innerWidth <= 1220) {
        setScreenWidth(1100);
        setSkeletonCount(3);
      } else if (window.innerWidth <= 1320) {
        setScreenWidth(1150);
        setSkeletonCount(4);
      } else if (window.innerWidth <= 1460) {
        setScreenWidth(1300);
        setSkeletonCount(4);
      } else if (window.innerWidth <= 1560) {
        setScreenWidth(1500);
        setSkeletonCount(4);
      } else if (window.innerWidth <= 1600) {
        setScreenWidth(1600);
        setSkeletonCount(4);
      } else if (window.innerWidth <= 1700) {
        setScreenWidth(1700);
        setSkeletonCount(4);
      } else {
        setScreenWidth(1650);
        setSkeletonCount(5);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const skeletonWidth = `${(screenWidth / skeletonCount) * 0.7}px`;
  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="d-flex justify-content-between align-items-center py-2"
          style={{
            background: "#f0f0f0",
            borderWidth: "0px 0px 1px 0px",
            borderColor: "#ddd",
            borderStyle: "solid",
          }}
        >
          <Skeleton width={30} height={16} baseColor="#f0f0f0" highlightColor="#a49e9e" className="ml-2" />
          {new Array(skeletonCount)
            .fill(
              <Skeleton
                className="skeleton-element"
                baseColor="#f0f0f0"
                highlightColor="#a49e9e"
                width={skeletonWidth}
                height={16}
              />
            )
            .map((val, i) => (
              <React.Fragment key={i + 1}>{val}</React.Fragment>
            ))}
          <Skeleton width={30} height={16} highlightColor="#212529" className="mr-2" />
        </div>

        {new Array(20)
          .fill(
            <>
              <div
                className="d-flex justify-content-between align-items-center py-1"
                style={{
                  borderWidth: "0px 0px 1px 0px",
                  borderColor: "#ddd",
                  borderStyle: "solid",
                  background: "#ffffff",
                }}
              >
                <Skeleton width={30} height={16} highlightColor="#f5f5f5" className="ml-2" />
                {new Array(skeletonCount)
                  .fill(
                    <Skeleton className="skeleton-element" highlightColor="#f5f5f5" width={skeletonWidth} height={16} />
                  )
                  .map((val, i) => (
                    <React.Fragment key={i + 1}>{val}</React.Fragment>
                  ))}
                <Skeleton width={30} height={30} highlightColor="#f5f5f5" className="mr-2" />
              </div>
            </>
          )
          .map((val, i) => (
            <React.Fragment key={i + 1}>{val}</React.Fragment>
          ))}
      </div>
    </>
  );
};

export default ListingSkeleton;
