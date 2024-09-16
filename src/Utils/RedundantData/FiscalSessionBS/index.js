import axios from "axios";
import {
  checkRedundantDataFullBS,
  checkRedundantDataShortBS,
} from "../../../Pages/FiscalSessionBS/Redux/api";

let cancelToken;

export const checkRedundantDataFiscalSessionBS = async (e, types) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    if (types === "full") {
      let { data } = await checkRedundantDataFullBS(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (types === "short") {
      let { data } = await checkRedundantDataShortBS(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {}
};
