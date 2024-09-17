import autoAnimate from "@formkit/auto-animate";
import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { IoFilter } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { io } from "socket.io-client";
import { loadOptionsItem, loadOptionsPermissionCategory } from "../../Pages/Questionnaire/Page/asyncFunction";
import { statusList } from "../../Utils/constants";
import { priorityOption, levelOptions, itemTypes } from "../../Utils/constants";
import { successFunction } from "../Alert/Alert";
import AsyncSelect from "../CommonAsyncSelectField/AsyncSelect";
import "../CommonDatePicker/DatePicker.css";
import "./CommonPageHeader.css";
import Notification from "./Notification";
import { socketNotification } from "./redux/notificationSlice";
import { getAllNotifications } from "./redux/thunk";
const DatePicker = lazy(() => import("react-datepicker"));
// cust
const CommonPageHeader = ({
  title,
  types,
  search,
  setSearch,
  status,
  setStatus,
  loading,
  data,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  count,
  item,
  setItem,
  permissionCategory,
  setPermissionCategory,
  priroity,
  setPriroity,
  level,
  setLevel,
  itemType,
  setItemType,
  setMinPrice,
  minPrice,
  setMaxPrice,
  maxPrice,
}) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state?.notification?.notifications);


  const unreadNotifications = notifications?.filter((notification) => notification?.read === false);
  const unreadNotificationsCount = unreadNotifications?.length;


  const [showParentAnimation] = useState(false);
  const [socket, setSocket] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const parent = useRef(null);
  const notificationAnimate = useRef(null);
  const statusFilter = ["Tickets"];
  const priroityFilter = ["Tickets"];
  const levelFilter = ["Tickets"];
  const dateFilter = ["lead", "inspection", "Sales"];
  const itemFilter = ["Questionnaires"];
  const itemtypeFilter = ["Items"];
  const priceFilter = ["Items"];
  const permissionCategoryFilter = ["Permissions"];

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const onPriceChange = (prices) => {
    const [min, max] = prices;
    setMinPrice(min);
    setMaxPrice(max);
  };

  const userName = useSelector((state) => state.auth.username);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      minHeight: "40px",
      maxWidth: "160px",
      width: "160px",
      height: "40px",
      borderRadius: "8px",
      boxShadow: state.isFocused ? null : null,
      borderColor: state.isSelected ? "#BE202F" : "#dee2e6",
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "40px",
      width: "160px",
      padding: "0 6px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
      width: "100%",
      color: "#BE202F", // Change color of the selected option text to blue
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "100%",
      paddingRight: "2px !important",
      paddingLeft: "2px !important",
      "& > *:nth-child()": {
        display: "none",
      },
    }),
    MenuList: (provided) => ({
      ...provided,
      width: "160px",
    }),
    option: (base, state) => ({
      ...base,
      padding: "5px 10px",
      cursor: "pointer",
      color: state.isFocused ? "#fff" : "#333",
      backgroundColor: state.isFocused ? "#BE202F" : "transparent", // Set background color on hover
      "&:hover": {
        cursor: "pointer",
        color: state.isFocused ? "#fff" : "#333",
        backgroundColor: state.isFocused ? "#BE202F" : "transparent", // Set background color on hover
        // Set background color on hover
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#BE202F", // Change color of the selected option text to blue
    }),
    listbox: () => ({
      width: "160px",
      padding: "10px !important",
    }),
    menuPortal: (base) => ({
      ...base,
      width: "160px",

      zIndex: 9999,
    }),
    menu: (base) => ({
      ...base,
      width: "160px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      display: "none", // Hide the dropdown indicator
    }),

    menuList: (base) => ({
      ...base,
      width: "160px",
    }),
    container: (base) => ({
      ...base,
      width: "160px !important",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "2px", // Adjust the padding of the cross icon
    }),
  };
  useEffect(() => {
    if (showFilter) {
      parent.current && autoAnimate(parent.current);
    }
  }, [showFilter]);
  useEffect(() => {
    notificationAnimate.current && autoAnimate(notificationAnimate.current);
  }, [notificationAnimate]);

  const toggleFilter = useCallback(() => {
    setShowFilter((prev) => !prev);
  }, []);

  useEffect(() => {
    const URL = process.env.REACT_APP_BASE_URL;
    const newSocket = io(URL, {
      autoConnect: false,
    });
    newSocket.connect();
    newSocket.on("connect", () => {});

    newSocket.on("notification", (data) => {
      if (userName !== data?.user?.username || isAdmin) {
        successFunction(`${data.user.username} ${data.action} ${data.instance}  `);
      }
      dispatch(socketNotification(data));
    });

    // return () => {
    //   newSocket.disconnect();
    // };
  }, [dispatch, postsPerPage, socket]);
  useEffect(() => {
    dispatch(getAllNotifications(postsPerPage));
  }, [dispatch, postsPerPage]);
  return (
    <>
      <div className="common-page-header  d-flex align-items-center justify-content-between">
        <div className="d-flex justify-content-between align-items-end w-100">
          <div className="d-flex align-items-end" style={{ height: "min-content", gap: "10px", width: "max-content" }}>
            <div className="title">{title}</div>
            <div className="showing-entries-filter">
              <>
                {loading ? (
                  <p className="d-flex justify-content-start fetching-data">
                    Fetching data<i className="period">.</i>
                    <i className="period">.</i>
                    <i className="period">.</i>
                  </p>
                ) : count === 0 ? (
                  <p className="d-flex justify-content-start">No entries found.</p>
                ) : count > 0 ? (
                  <p>
                    {data?.length} of {count} Entries
                  </p>
                ) : (
                  ""
                )}
              </>
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              gap: "20px",
              ...(types === "question" ? { zIndex: 1, top: 0, right: 0, position: "absolute" } : {}),
            }}
          >
            <div className={`d-flex justify-content-center flex-column ${showParentAnimation ? "show-animation" : ""}`}>
              <div className="d-flex" style={{ gap: "10px" }}>
                <input
                  style={{
                    width: "100%",
                    minWidth: "200px",
                    boxShadow: "0px 0px 19px 0px #e7e7e74d",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 10px",
                    outline: "none",
                  }}
                  className="border"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value.trimStart())}
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
                <div ref={parent}>
                  {showFilter && (
                    <div
                      className={" "}
                      style={{
                        width: "max-content",
                      }}
                    >
                      <div
                        className={`w-100  ${
                          statusFilter.includes(types) ||
                          priroityFilter.includes(types) ||
                          levelFilter.includes(types) ||
                          dateFilter.includes(types) ||
                          itemFilter.includes(types) ||
                          itemtypeFilter.includes(types) ||
                          priceFilter.includes(types) ||
                          permissionCategoryFilter.includes(types)
                            ? "d-flex"
                            : "d-none"
                        }`}
                        style={{ gap: "10px" }}
                      >
                        {statusFilter.includes(types) && (
                          <Select
                            styles={customStyles}
                            value={status}
                            isClearable={true}
                            isSearchable={true}
                            className="btn-filter"
                            name="status"
                            placeholder="Status"
                            options={statusList}
                            getOptionLabel={(option) => `${option.value}`}
                            getOptionValue={(option) => `${option.id}`}
                            onChange={(selected) => {
                              setStatus(selected);
                            }}
                          />
                        )}
                        {priroityFilter.includes(types) && (
                          <Select
                            styles={customStyles}
                            value={priroity}
                            isClearable={true}
                            isSearchable={true}
                            className="btn-filter"
                            name="Priroity"
                            placeholder="Priroity"
                            options={priorityOption}
                            getOptionLabel={(option) => `${option.value}`}
                            getOptionValue={(option) => `${option.id}`}
                            onChange={(selected) => {
                              setPriroity(selected);
                            }}
                          />
                        )}
                        {levelFilter.includes(types) && (
                          <Select
                            styles={customStyles}
                            value={level}
                            isClearable={true}
                            isSearchable={true}
                            className="btn-filter"
                            name="Level"
                            placeholder="Level"
                            options={levelOptions}
                            getOptionLabel={(option) => `${option.value}`}
                            getOptionValue={(option) => `${option.id}`}
                            onChange={(selected) => {
                              setLevel(selected);
                            }}
                          />
                        )}
                        {itemFilter.includes(types) && (
                          <AsyncSelect
                            styles={customStyles}
                            isNotFormik
                            // isMulti={true}
                            // label="Facility"
                            value={item}
                            name="item"
                            getOptionLabel={(option) => `${option?.name} `}
                            getOptionValue={(option) => `${option?._id}`}
                            onChange={(select) => {
                              setItem(select);
                            }}
                            loadOptions={loadOptionsItem}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                          />
                        )}
                        {permissionCategoryFilter.includes(types) && (
                          <AsyncSelect
                            styles={customStyles}
                            isNotFormik
                            // isMulti={true}
                            // label="Facility"
                            value={permissionCategory}
                            name="permissionCategory"
                            getOptionLabel={(option) => `${option?.name} `}
                            getOptionValue={(option) => `${option?._id}`}
                            onChange={(select) => {
                              setPermissionCategory(select);
                            }}
                            loadOptions={loadOptionsPermissionCategory}
                            additional={{
                              offset: 0,
                              limit: 10,
                              permissionCategory: permissionCategory ? permissionCategory : "",
                            }}
                          />
                        )}
                        {itemtypeFilter.includes(types) && (
                          <Select
                            styles={customStyles}
                            value={itemType}
                            isClearable={true}
                            isSearchable={true}
                            className="btn-filter"
                            name="ItemType"
                            placeholder="ItemType"
                            options={itemTypes}
                            getOptionLabel={(option) => `${option.value}`}
                            getOptionValue={(option) => `${option.id}`}
                            onChange={(selected) => {
                              setItemType(selected);
                            }}
                          />
                        )}
                        {priceFilter.includes(types) && (
                          <>
                            <input
                              value={minPrice}
                              className="input-filter"
                              name="MinPrice"
                              isClearable={true}
                              placeholder="MinPrice"
                              onChange={(e) => onPriceChange([e.target.value, maxPrice])}
                            />
                            <input
                              value={maxPrice}
                              className="input-filter"
                              name="MaxPrice"
                              isClearable={true}
                              placeholder="MaxPrice"
                              onChange={(e) => onPriceChange([minPrice, e.target.value])}
                            />
                          </>
                        )}

                        {dateFilter.includes(types) && (
                          <div className="common-datepicker-wrapper">
                            <DatePicker
                              selected={startDate}
                              onChange={onChange}
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                              isClearable={true}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`btn filter  ${
                    statusFilter.includes(types) ||
                    priroityFilter.includes(types) ||
                    levelFilter.includes(types) ||
                    dateFilter.includes(types) ||
                    itemFilter.includes(types) ||
                    itemtypeFilter.includes(types) ||
                    priceFilter.includes(types) ||
                    permissionCategoryFilter.includes(types)
                      ? "d-flex"
                      : "d-none"
                  }`}
                  onClick={toggleFilter}
                  style={{}}
                >
                  <IoFilter />
                </div>
              </div>
            </div>
            <div className="border" style={{ height: "30px", width: "1px" }} />
            <div className="position-relative">
              <div className="dropdown">
                <button
                  type="button"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="bg-transparent border-0"
                  style={{ outline: "none" }}
                >
                  <MdNotificationsNone size={26} />
                </button>
                <div
                  ref={notificationAnimate}
                  style={{ borderRadius: "8px" }}
                  className="dropdown-menu border-0  mt-4 dropdown-menu-lg p-0 notification-dropdown-menu"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  {<Notification setPostsPerPage={setPostsPerPage} />}
                </div>
              </div>
              <div
                className="position-absolute  badge badge-danger"
                data-bs-toggle="dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{
                  top: "-5px",
                  padding: "4px",
                  right: "-5px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  minWidth: "min-content",
                }}
              >
                {/* {unreadNotificationsCount} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonPageHeader;
