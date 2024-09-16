import axios from "axios";

import {
  checkRedundantDataName,
  checkRedundantDataCode,
  checkRedundantDataEmail,
} from "../../../Pages/Department/Redux/api";

let cancelToken;

export const checkRedundantDataDepartment = async (e, types) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    if (types === "name") {
      let { data } = await checkRedundantDataName(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (types === "code") {
      let { data } = await checkRedundantDataCode(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (types === "email") {
      let { data } = await checkRedundantDataEmail(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {}
};
