import axiosInstance from "../../../Utils/axios";

// API for notification
export const getAllNotifications = (postsPerPage) => axiosInstance.get(`/api/v1/notification-app/notifications`);

export const updateNotification = (id) => axiosInstance.patch(`api/v1/notification-app/notifications/${id}/read`);

export const markAllNotificationRead = () => axiosInstance.patch(`api/v1/notification-app/notifications/read-all`);
