import React from "react";

const PermissionList = ({ permissions, title, checkedPermissions, setCheckedPermissions }) => {
  const handleChange = (permission) => {
    const alreadyCheckedPermission = checkedPermissions.filter((permi) => permi.id === permission.id);

    if (alreadyCheckedPermission.length === 0) {
      setCheckedPermissions([...checkedPermissions, permission]);
    } else {
      const filteredPermissions = checkedPermissions.filter((permi) => permi.id !== permission.id);
      setCheckedPermissions(filteredPermissions);
    }
  };
  const handleToggleAll = (permissions) => {
    if (permissions.length !== checkedPermissions.length) {
      setCheckedPermissions(permissions);
    } else {
      setCheckedPermissions([]);
    }
  };
  return (
    <div className="col-sm-5 mt-2 mb-2">
      <div className="card-permission  py-3">
        <div className="header-content mb-0">
          <div className="row">
            <div className="col-1" style={{ paddingRight: "0" }}>
              <input
                type="checkbox"
                name={title}
                checked={checkedPermissions.length === permissions.length && permissions.length !== 0}
                onChange={() => handleToggleAll(permissions)}
                disabled={permissions.length === 0}
              />
            </div>
            <div className="col-11" style={{ paddingRight: "0.125em" }}>
              <h4 className="m-0">{title}</h4>
              <p className="m-0">{`${checkedPermissions.length}/${permissions.length} selected`}</p>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="permission-list">
            <ul className="list-permission" style={{ listStyleType: "none" }}>
              {permissions.length > 0 &&
                permissions.map((permission) => {
                  return (
                    <li className="list-group-permission" onClick={() => handleChange(permission)} key={permission.id}>
                      <div className="row align-text-center">
                        <div className="col-1" style={{ paddingRight: 0 }}>
                          <input
                            type="checkbox"
                            name={permission.name}
                            checked={checkedPermissions.includes(permission)}
                            onChange={() => handleChange(permission)}
                          />
                        </div>
                        <div className="col-11" style={{ paddingRight: "0.125em" }}>
                          {permission.name}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionList;
