import axios from "axios";
import { checkRedundantDataItemName, checkRedundantDataItemCode } from "../../../Pages/Item/Redux/api";
import { checkRedundantDataMaterialTypeName } from "../../../Pages/MaterialType/Redux/api";
import { checkRedundantDataUnitName } from "../../../Pages/Unit/Redux/api";
import { checkRedundantDataQualityName } from "../../../Pages/Quality/Redux/api";
import { checkRedundantDataDyeHouseName } from "../../../Pages/DyeHouse/Redux/api";
import { checkRedundantDataCarpetTypeName } from "../../../Pages/CarpetType/Redux/api";

let cancelToken;

export const checkRedundantDataItem = async (e, types) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    if (types === "name") {
      let { data } = await checkRedundantDataItemName(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    } else if (types === "code") {
      let { data } = await checkRedundantDataItemCode(e, cancelToken);
      if (data.results.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {}
};

export const checkRedundantDataMaterialType = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    let { data } = await checkRedundantDataMaterialTypeName(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const checkRedundantDataCarpetType = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    let { data } = await checkRedundantDataCarpetTypeName(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const checkRedundantDataUnit = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    let { data } = await checkRedundantDataUnitName(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const checkRedundantDataDyeHouse = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    let { data } = await checkRedundantDataDyeHouseName(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

export const checkRedundantDataQuality = async (e) => {
  //Check if there are any previous pending requests
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel("Operation canceled due to new request.");
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    let { data } = await checkRedundantDataQualityName(e, cancelToken);
    if (data.results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};
