import { toast } from "sonner";

const showToast = (message, type) => {
  const defaultMessage = typeof message === "string" ? message : type;
  toast[type](defaultMessage, {
    position: "top-right",
    autoClose: 2500000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const errorFunction = (data) => showToast(data, "error");
export const successFunction = (data) => showToast(data, "success");
export const infoFunction = (data) => showToast(data, "info");
