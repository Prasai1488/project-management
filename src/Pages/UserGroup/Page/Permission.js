import "./userGroup.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { errorFunction } from "../../../Components/Alert/Alert";
import PermissionList from "./PermissionList";
import { getAllPermission, getSpecificUserPermissions } from "../Redux/thunk";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import axiosInstance from "../../../Utils/axios";

const Permission = ({ selectedPermissions, setSelectedPermissions, holdPermissions, setHoldPermissions }) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.userGroup.permissions);

  const { userGroup, edit } = useSelector((state) => state.userGroup);
  // states
  const [permissionCategory, setPermissionCategory] = useState(null);
  const [unSelectedPermissions, setUnSelectedPermissions] = useState([]);
  const [selectedCheckedPermissions, setSelectedCheckedPermissions] = useState([]);
  const [unSelectedCheckedPermissions, setUnSelectedCheckedPermissions] = useState([]);

  useEffect(() => {
    dispatch(getAllPermission());
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (userGroup?.permissions.length > 0 && selectedPermissions.length === 0) {
        // used while edit the permission
        if (holdPermissions.length > 0) {
          const idOfHoldPermission = holdPermissions.map((permi) => permi.id);
          const filteredPermission = userGroup.permissions.filter((permi) => !idOfHoldPermission.includes(permi));
          const filteredData = permissions.filter((permi) => !filteredPermission.includes(permi.id));
          const commonData = permissions.filter((permi) => filteredPermission.includes(permi.id));

          setUnSelectedPermissions(filteredData);
          setSelectedPermissions(commonData);
        } else {
          const filteredData = permissions?.filter((permi) => !userGroup?.permissions.includes(permi.id));

          const commonData = permissions.filter((permi) => userGroup?.permissions.includes(permi.id));

          setUnSelectedPermissions(filteredData);
          setSelectedPermissions(commonData);
        }
      } else if (userGroup?.permissions.length > 0 && selectedPermissions.length > 0) {
        const filteredData = permissions.filter((permi) => !selectedPermissions.find(({ id }) => permi.id === id));
        setUnSelectedPermissions(filteredData);
      } else {
        if (permissions.length > 0) {
          if (selectedPermissions.length > 0) {
            const filteredData = permissions.filter((permi) => !selectedPermissions.find(({ id }) => permi.id === id));
            setUnSelectedPermissions(filteredData);
          } else {
            setUnSelectedPermissions(permissions);
          }
        }
      }
    } else {
      if (permissions.length > 0) {
        if (selectedPermissions.length > 0) {
          const filteredData = permissions.filter((permi) => !selectedPermissions.find(({ id }) => permi.id === id));
          setUnSelectedPermissions(filteredData);
        } else {
          setUnSelectedPermissions(permissions);
        }
      }
    }
  }, [permissions, edit]);

  const handleChange = (selected) => {
    setPermissionCategory(selected);
    if (selected !== null) {
      dispatch(getSpecificUserPermissions(selected?.id));
    } else {
      dispatch(getAllPermission());
    }
  };
  const handleSelectPermission = () => {
    if (unSelectedCheckedPermissions.length > 0 && selectedCheckedPermissions.length === 0) {
      const filteredUnSelectedPermissions = unSelectedPermissions.filter(
        (permi) => !unSelectedCheckedPermissions.find(({ id }) => permi.id === id)
      );
      setSelectedPermissions([...selectedPermissions, ...unSelectedCheckedPermissions]);
      setUnSelectedPermissions(filteredUnSelectedPermissions);
      setUnSelectedCheckedPermissions([]);
    } else {
      if (unSelectedCheckedPermissions.length === 0 && selectedCheckedPermissions.length === 0) {
        errorFunction("Please select permission from unselected permissions");
      } else {
        errorFunction("Yo have checked some permission from selected permissions.Please uncheck them and try again");
      }
    }
  };
  const handleUnSelectPermission = () => {
    if (selectedCheckedPermissions.length > 0 && unSelectedCheckedPermissions.length === 0) {
      const belongingCheck = permissions.filter((permi) =>
        selectedCheckedPermissions.find(({ id }) => permi.id === id)
      );
      if (belongingCheck.length === selectedCheckedPermissions.length) {
        const filteredSelectedPermissions = selectedPermissions.filter(
          (permi) => !selectedCheckedPermissions.find(({ id }) => permi.id === id)
        );

        setUnSelectedPermissions([...unSelectedPermissions, ...selectedCheckedPermissions]);
        setSelectedPermissions(filteredSelectedPermissions);
        if (edit) {
          setHoldPermissions(selectedCheckedPermissions);
        }
        setSelectedCheckedPermissions([]);
      } else {
        errorFunction(
          "You are trying to remove permission of another module.Please check the module and remove related permissions"
        );
      }
    } else {
      if (unSelectedCheckedPermissions.length === 0 && selectedCheckedPermissions.length === 0) {
        errorFunction("Please select permission from selected permissions");
      } else {
        errorFunction("Yo have checked some permission from unselected permissions.Please uncheck them and try again");
      }
    }
  };

  const loadOptions = async (search, loadOptions, { limit, offset }) => {
    const { data } = await axiosInstance(`auth/permission-categories?search=${search}&offset=${offset}&limit=${limit}`);

    return {
      options: data.results,
      hasMore: data.next ? true : false,
      additional: {
        offset: data.count > offset ? offset + 10 : offset,
        limit: 10,
      },
    };
  };
  return (
    <div className="row permission-container">
      <div className="col-12 title-container">
        <h5>Add User Permission</h5>
        <div className="sub-title-container">
          <label htmlFor="permissionCategory">Select Permission Group </label>
          <AsyncSelect
            value={permissionCategory}
            name="permissionCategory"
            getOptionLabel={(option) => `${option?.name} `}
            getOptionValue={(option) => `${option?.id}`}
            onChange={(selected) => {
              handleChange(selected);
            }}
            isNotFormik={true}
            loadOptions={loadOptions}
            additional={{
              offset: 0,
              limit: 10,
            }}
          />
        </div>
      </div>
      <PermissionList
        permissions={unSelectedPermissions}
        title="UnSelected Permissions"
        checkedPermissions={unSelectedCheckedPermissions}
        setCheckedPermissions={setUnSelectedCheckedPermissions}
      />
      <div className="col-sm-2 d-flex p-0 align-items-center justify-content-center">
        <div className="align-middle">
          <div>
            <button
              type="button"
              className="btn btn-sm"
              onClick={handleSelectPermission}
              disabled={unSelectedPermissions.length === 0}
            >
              <FaArrowRight />
            </button>
          </div>
          <div>
            <button
              type="button"
              className=" btn btn-sm mt-2"
              onClick={handleUnSelectPermission}
              disabled={selectedPermissions.length === 0}
            >
              <FaArrowLeft />
            </button>
          </div>
        </div>
      </div>
      <PermissionList
        permissions={selectedPermissions}
        title="Selected Permissions"
        checkedPermissions={selectedCheckedPermissions}
        setCheckedPermissions={setSelectedCheckedPermissions}
      />
    </div>
  );
};

export default Permission;
