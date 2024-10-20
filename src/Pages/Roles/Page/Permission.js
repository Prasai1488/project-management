import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { errorFunction } from "../../../Components/Alert/Alert";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import axiosInstance from "../../../Utils/axios";
import { getAllPermission, getSpecificUserPermissions } from "../Redux/thunk";
import PermissionList from "./PermissionList";
import "./role.css";

const Permission = ({ selectedPermissions, setSelectedPermissions, holdPermissions, setHoldPermissions }) => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.role.permissions);

  const { role, edit } = useSelector((state) => state.role);
  // states
  const [permissionCategory, setPermissionCategory] = useState([
    { id: 5, name: "Select Permission" },
    { id: 6, name: "Select Permission" },
    { id: 7, name: "Select Permission" },
    { id: 8, name: "Select Permission" },
  ]);
  const [unSelectedPermissions, setUnSelectedPermissions] = useState([
    { id: 1, name: "UnSelect permission" },
    { id: 2, name: "UnSelect permission" },
    { id: 3, name: "UnSelect permission" },
    { id: 4, name: "UnSelect permission" },
  ]);
  const [selectedCheckedPermissions, setSelectedCheckedPermissions] = useState([]);
  const [unSelectedCheckedPermissions, setUnSelectedCheckedPermissions] = useState([]);

  useEffect(() => {
    dispatch(getAllPermission());
  }, [dispatch]);

  useEffect(() => {
    if (edit) {
      if (role?.permissions.length > 0 && selectedPermissions.length === 0) {
        // used while edit the permission
        if (holdPermissions?.length > 0) {
          const idOfHoldPermission = holdPermissions.map((permi) => permi.id);
          const filteredPermission = role?.permissions?.filter((permi) => !idOfHoldPermission.includes(permi));
          const filteredData = permissions.filter((permi) => !filteredPermission?.includes(permi._id));
          const commonData = permissions.filter((permi) => filteredPermission?.includes(permi._id));

          setUnSelectedPermissions(filteredData);
          setSelectedPermissions(commonData);
        } else {
          const filteredData = permissions?.filter((permi) => !role?.permissions.includes(permi._id));

          const commonData = permissions?.filter((permi) => role?.permissions.includes(permi._id));

          setUnSelectedPermissions(filteredData);
          setSelectedPermissions(commonData);
        }
      } else if (role?.permissions.length > 0 && selectedPermissions.length > 0) {
        const filteredData = permissions.filter((permi) => !selectedPermissions.find(({ id }) => permi._id === id));
        setUnSelectedPermissions(filteredData);
      } else {
        if (permissions.length > 0) {
          if (selectedPermissions.length > 0) {
            const filteredData = permissions.filter((permi) => !selectedPermissions.find(({ id }) => permi._id === id));
            setUnSelectedPermissions(filteredData);
          } else {
            setUnSelectedPermissions(permissions);
          }
        }
      }
    } else {
      if (permissions?.length > 0) {
        if (selectedPermissions.length > 0) {
          const filteredData = permissions.filter((permi) => !selectedPermissions.find(({ id }) => permi._id === id));
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
      dispatch(getSpecificUserPermissions(selected?._id));
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
          (permi) => !selectedCheckedPermissions.find(({ id }) => permi._id === id)
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
    const { data } = await axiosInstance(
      `api/v1/permission-category-app/permission-category?search=${search}&offset=${offset}&limit=${limit}`
    );

    return {
      options: data.permissionCategories,
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
        {/* <h5>Add User Permission</h5> */}
        <div className="sub-title-container">
          <label htmlFor="permissionCategory">Select Permission Group </label>
          <AsyncSelect
            value={permissionCategory}
            name="permissionCategory"
            getOptionLabel={(option) => `${option?.name} `}
            getOptionValue={(option) => `${option?._id}`}
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
              className="btn btn-sm p-0"
              onClick={handleSelectPermission}
              disabled={unSelectedPermissions.length === 0}
            >
              <FaArrowRight />
            </button>
          </div>
          <div>
            <button
              type="button"
              className=" btn btn-sm p-0"
              onClick={handleUnSelectPermission}
              disabled={selectedPermissions?.length === 0}
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

// import React, { useEffect, useState } from "react";
// import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { errorFunction } from "../../../Components/Alert/Alert";
// import PermissionList from "./PermissionList";
// import "./role.css";

// const Permission = () => {
//   const [unSelectedPermissions, setUnSelectedPermissions] = useState([
//     { id: 1, name: "UnSelect permission" },
//     { id: 2, name: "UnSelect permission" },
//     { id: 3, name: "UnSelect permission" },
//     { id: 4, name: "UnSelect permission" },
//   ]);
//   const [selectedPermissions, setSelectedPermissions] = useState([
//     { id: 4, name: "Select Permission" },
//     { id: 5, name: "Select Permission" },
//     { id: 6, name: "Select Permission" },
//     { id: 7, name: "Select Permission" }, // Fixed duplicate id
//   ]);

//   const [selectedCheckedPermissions, setSelectedCheckedPermissions] = useState([]);
//   const [unSelectedCheckedPermissions, setUnSelectedCheckedPermissions] = useState([]);

//   const handleSelectPermission = () => {
//     if (unSelectedCheckedPermissions.length > 0 && selectedCheckedPermissions.length === 0) {
//       const filteredUnSelectedPermissions = unSelectedPermissions.filter(
//         (permi) => !unSelectedCheckedPermissions.find(({ id }) => permi.id === id)
//       );
//       setSelectedPermissions([...selectedPermissions, ...unSelectedCheckedPermissions]);
//       setUnSelectedPermissions(filteredUnSelectedPermissions);
//       setUnSelectedCheckedPermissions([]);
//     } else {
//       if (unSelectedCheckedPermissions.length === 0 && selectedCheckedPermissions.length === 0) {
//         errorFunction("Please select permission from unselected permissions");
//       } else {
//         errorFunction("You have checked some permission from selected permissions. Please uncheck them and try again");
//       }
//     }
//   };

//   const handleUnSelectPermission = () => {
//     if (selectedCheckedPermissions.length > 0 && unSelectedCheckedPermissions.length === 0) {
//       const filteredSelectedPermissions = selectedPermissions.filter(
//         (permi) => !selectedCheckedPermissions.find(({ id }) => permi.id === id)
//       );
//       setUnSelectedPermissions([...unSelectedPermissions, ...selectedCheckedPermissions]);
//       setSelectedPermissions(filteredSelectedPermissions);
//       setSelectedCheckedPermissions([]);
//     } else {
//       if (unSelectedCheckedPermissions.length === 0 && selectedCheckedPermissions.length === 0) {
//         errorFunction("Please select permission from selected permissions");
//       } else {
//         errorFunction(
//           "You have checked some permission from unselected permissions. Please uncheck them and try again"
//         );
//       }
//     }
//   };

//   return (
//     <div className="row permission-container">
//       {/* Unselected Permissions List */}
//       <PermissionList
//         permissions={unSelectedPermissions}
//         title="Unselected Permissions"
//         checkedPermissions={unSelectedCheckedPermissions}
//         setCheckedPermissions={setUnSelectedCheckedPermissions}
//       />
//       <div className="col-sm-2 d-flex p-0 align-items-center justify-content-center">
//         <div className="align-middle">
//           <div>
//             <button
//               type="button"
//               className="btn btn-sm"
//               onClick={handleSelectPermission}
//               disabled={unSelectedPermissions.length === 0}
//             >
//               <FaArrowRight />
//             </button>
//           </div>
//           <div>
//             <button
//               type="button"
//               className="btn btn-sm mt-2"
//               onClick={handleUnSelectPermission}
//               disabled={selectedPermissions.length === 0}
//             >
//               <FaArrowLeftLong />
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Selected Permissions List */}
//       <PermissionList
//         permissions={selectedPermissions}
//         title="Selected Permissions"
//         checkedPermissions={selectedCheckedPermissions}
//         setCheckedPermissions={setSelectedCheckedPermissions}
//       />
//     </div>
//   );
// };

// export default Permission;
