import axios from "axios";
import { checkRedundantDataFullAD, checkRedundantDataShortAD } from "../../../Pages/FiscalSessionAD/Redux/api";

let cancelToken;

export const checkRedundantDataFiscalSessionAD = async (e, types) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    if (types === "full") {
      let { data } = await checkRedundantDataFullAD(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (types === "short") {
      let { data } = await checkRedundantDataShortAD(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {}
};
