import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const LodingListingSkeleton = ({ numberOfColumns }) => {
  const [skeletonCount, setSkeletonCount] = useState(4);

  useEffect(() => {
    if (Number(window.innerWidth) >= 1800) {
      setSkeletonCount(5);
    } else {
      setSkeletonCount(4);
    }
  }, [window.innerWidth]);
  return (
    <>
      <tr>
        {Array.from({ length: numberOfColumns }, (_, i) => (
          <td key={i}>
            <Skeleton height={25} />
          </td>
        ))}
      </tr>
      <tr>
        {Array.from({ length: numberOfColumns }, (_, i) => (
          <td key={i}>
            <Skeleton height={25} />
          </td>
        ))}
      </tr>
    </>
  );
};

export default LodingListingSkeleton;
