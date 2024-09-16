import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
const NotificationSkeleton = () => {
  return (
    <div className="notification-card border-top w-100">
      <Skeleton width={40} height={40} borderRadius={100} />
      <div className="card-text">
        <p className="notification-message">
          <span>
            <Skeleton height={40} />
          </span>
        </p>
        <p>
          <Skeleton height={20} />
        </p>
      </div>
      <div className="hour-alert">
        <Skeleton className="alert bg-transparent" width={12} height={12} borderRadius={100} />
        <div></div>
        <div className="hour">
          <Skeleton height={20} width={50} />
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
