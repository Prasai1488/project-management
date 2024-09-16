import axios from "axios";
import { checkRedundantDataOrderNo } from "../../../Pages/CustomerOrder/Redux/api";

let cancelToken;

export const checkRedundantDataCustomerOrder = async (e, types) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    let { data } = await checkRedundantDataOrderNo(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};
