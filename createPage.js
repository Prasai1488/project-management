import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to create a directory if it doesn't exist
function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  } else {
    console.log(`Directory already exists: ${directoryPath}`);
  }
}

// Function to create a file with some initial content
function createFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, "utf8");
  } catch (error) {
    console.error(`Error creating file ${filePath}:`, error);
  }
}

// Get the route name from command line arguments
const routeName = process.argv[2];

if (!routeName) {
  console.error("Please provide a route name.");
  process.exit(1);
}

// Convert routeName to capitalize the first letter
const capitalizedRouteName = routeName.charAt(0).toUpperCase() + routeName.slice(1);

// Define the base path for the pages
const pagesDir = path.join(__dirname, "src", "Pages");

// Define paths for the new route directory and its subdirectories
const newRouteDir = path.join(pagesDir, capitalizedRouteName);
const pageDir = path.join(newRouteDir, "Page");
const reduxDir = path.join(newRouteDir, "Redux");

// Create directories
createDirectory(newRouteDir);
createDirectory(pageDir);
createDirectory(reduxDir);

// Define the file names for Page folder
const indexFile = path.join(pageDir, "index.js");
const createFilePath = path.join(pageDir, `Create${capitalizedRouteName}.js`);
const listingFilePath = path.join(pageDir, `${capitalizedRouteName}Listing.js`);
const cssFilePath = path.join(pageDir, `${routeName}.css`);

// Define the content for the Page files
const indexContent = `import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCreateButton from "../../../Components/CommonCreateButton/CommonCreateButton";
import CommonPageHeader from "../../../Components/CommonPageHeader/CommonPageHeader";
import ListingSkeleton from "../../../Components/Skeleton/ListingSkeleton";
import useDebounce from "../../../Utils/Hooks/useDebounce";
import { clearAll${capitalizedRouteName} } from "../Redux/${routeName}Slice";
import { getAll${capitalizedRouteName}s, handleSearch } from "../Redux/thunk";
import Create${capitalizedRouteName} from "./Create${capitalizedRouteName}";
import "./${routeName}.css";
import ${capitalizedRouteName}Listing from "./${capitalizedRouteName}Listing";

const Modal = lazy(() => import("../../../Components/Modal/Modal"));

const title = "${capitalizedRouteName}s";
const types = "${capitalizedRouteName}s";

const ${capitalizedRouteName}s = () => {
  const dispatch = useDispatch();
  const { permissions, isSuperuser } = useSelector((state) => state.auth);
  const loading${capitalizedRouteName} = useSelector((state) => state.${routeName}.loading${capitalizedRouteName});
  const ${routeName}s = useSelector((state) => state.${routeName}.${routeName}s);
  const count = useSelector((state) => state.${routeName}.count);
  const edit = useSelector((state) => state.${routeName}.edit);
  const [show${capitalizedRouteName}Modal, setShow${capitalizedRouteName}Modal] = useState(false);

  const [search, setSearch] = useState("");
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [page,setPage]=useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      dispatch(getAll${capitalizedRouteName}s({postsPerPage,page}));
    } else {
      dispatch(handleSearch({ search, postsPerPage }));
    }
  }, [postsPerPage, debouncedSearch,page]);

  const createPermission = isSuperuser || permissions?.includes("") || true;

  return (
    <>
      <div className="listing-wrapper">
        <CommonPageHeader
          title={title}
          dispatch={dispatch}
          search={search}
          setSearch={setSearch}
          loading={loading${capitalizedRouteName}}
          data={${routeName}s}
          count={count}
        />

        {loading${capitalizedRouteName} && <ListingSkeleton />}
        {!loading${capitalizedRouteName} && <${capitalizedRouteName}Listing setPage={setPage} setPostsPerPage={setPostsPerPage} dispatch={dispatch} set${capitalizedRouteName}Modal={setShow${capitalizedRouteName}Modal} />}
      </div>
      <CommonCreateButton
        types={types}
        title={title}
        showModal={show${capitalizedRouteName}Modal}
        setShowModal={setShow${capitalizedRouteName}Modal}
        createPermission={createPermission}
      />
      {show${capitalizedRouteName}Modal && (
        <Suspense fallback={<div></div>}>
          <Modal
            showModal={show${capitalizedRouteName}Modal}
            setShowModal={setShow${capitalizedRouteName}Modal}
            header={edit ? "Update ${capitalizedRouteName}" : "Add ${capitalizedRouteName}"}
            types={types}
            edit={edit}
            size={"modal-lg"}
            clearAction={clearAll${capitalizedRouteName}}
          >
            <Create${capitalizedRouteName} dispatch={dispatch} postsPerPage={postsPerPage} setShowModal={setShow${capitalizedRouteName}Modal} />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default ${capitalizedRouteName}s;
`;

const createContent = `import { Formik } from "formik";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import FormWrapper from "../../../Components/FormWrapper/FormWrapper";
import Loader from "../../../Components/Loader";
import { renderTextField } from "../../../Utils/customFields";
import { create${capitalizedRouteName}s, getAll${capitalizedRouteName}s, update${capitalizedRouteName}s } from "../Redux/thunk";

const Create${capitalizedRouteName} = ({ dispatch, postsPerPage = 10, setShowModal, type }) => {
  const formRef = useRef();
  const ${routeName} = useSelector((state) => state.${routeName}.${routeName});
  const loading = useSelector((state) => state.${routeName}.loading);
  const loadingUpdated = useSelector((state) => state.${routeName}.loadingUpdated);
  const edit = useSelector((state) => state.${routeName}.edit);

  const initialState = {
    name: edit ? ${routeName}?.name : "",
    email: edit ? ${routeName}?.email : "",
    phone: edit ? ${routeName}?.phone : "",
    address: edit ? ${routeName}?.address : "",
    pan: edit ? ${routeName}?.pan : "",
    contactPerson: edit ? ${routeName}?.contactPerson : "",
    contactPersonPhoneNo: edit ? ${routeName}?.contactPersonPhoneNo : "",
    isActive: edit ? ${routeName}?.isActive : true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email!").required("Required!"),
    phone: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    address: Yup.string().required("Required!"),
    pan: Yup.string().required("Required!"),
    contactPerson: Yup.string().required("Required!"),
    contactPersonPhoneNo: Yup.number().max(9999999999, "Invalid length!").required("Required!"),
    isActive: Yup.boolean().required("Required!"),
  });

  const onSubmit = (values) => {
    const action = edit ? update${capitalizedRouteName}s({ id: ${routeName}?._id, values:values }) : create${capitalizedRouteName}s(values);
    const successMessage = edit ? \`\${type} Updated successfully\` : \`\${type} Created successfully\`;

    dispatch(action)
      .unwrap()
      .then(() => {
        successFunction(successMessage);
        dispatch(getAll${capitalizedRouteName}s(postsPerPage));
        setShowModal(false);
      })
      .catch(errorFunction);
  };

  return (
    <>
      {(loading || loadingUpdated) && <Loader />}
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {(formik) => {
          return (
            <FormWrapper>
              {renderTextField(formik, 6, "name", "text", "Name", true)}
              {renderTextField(formik, 6, "email", "email", "Email", true)}
              {renderTextField(formik, 6, "phone", "number", "Phone", true)}
              {renderTextField(formik, 6, "address", "text", "Address", true)}
              {renderTextField(formik, 6, "pan", "text", "PAN", true)}
              {renderTextField(formik, 6, "contactPerson", "text", "Contact Person", true)}
              {renderTextField(formik, 6, "contactPersonPhoneNo", "number", "Contact Person Phone No", true)}
            </FormWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export default Create${capitalizedRouteName};
`;

const listingContent = `import React, { useRef } from "react";
import { useSelector } from "react-redux";
import DetailActionButton from "../../../Components/Icons/DetailButtonIcon";
import NoData from "../../../Components/NoData/NoData";
import CommonTableLayout, { TableData } from "../../../Components/Table/CommonTableLayout";
import { useInfinteScroll } from "../../../hooks/useInfiniteScroll";
import { ${routeName}sEditSuccess } from "../Redux/${routeName}Slice";
import { getNext } from "../Redux/thunk";

const TableHeaders = ["SN", "Name", "Email", "Phone", "Contact Person", "Contact Person Phone", "Action"];

const ${capitalizedRouteName}Listing = ({ dispatch,set${capitalizedRouteName}Modal,setPostsPerPage,setPage }) => {
  const listRef = useRef(null);

  const ${routeName}s = useSelector((state) => state?.${routeName}?.${routeName}s);
  const next = useSelector((state) => state.${routeName}.next);
  const {loadingNext,loading${capitalizedRouteName}} = useSelector((state) => state.${routeName});
  const { handleScroll } = useInfinteScroll({
    loadingNext: loading${capitalizedRouteName},
    next,
    getNext,
    setPostsPerPage,
    setPage,
  });

  const handleEdit = (id) => {
    dispatch(${routeName}sEditSuccess(id));
    set${capitalizedRouteName}Modal(true);
  };

  return (
    <>
      {${routeName}s && ${routeName}s.length > 0 ? (
        <CommonTableLayout
          listRef={listRef}
          TableHeaders={TableHeaders}
          onscroll={handleScroll}
          loadingNext={loadingNext}
        >
          {${routeName}s &&
            ${routeName}s.map((${routeName.toLowerCase()}, i) => {
              const { _id, name, email, phoneNo, contactPerson, contactPersonPhoneNo } = ${routeName.toLowerCase()};
              return (
                <tr key={_id} style={{ cursor: "pointer" }}>
                  <td>{i + 1}</td>
                  <TableData data={name} />
                  <TableData data={email} />
                  <TableData data={phoneNo} />
                  <TableData data={contactPerson} />
                  <TableData data={contactPersonPhoneNo} />
                  <td className="column_resizer_body" />
                  <td>
                    <DetailActionButton type={"edit"} onClick={() => handleEdit(_id)} />
                  </td>
                </tr>
              );
            })}
        </CommonTableLayout>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default ${capitalizedRouteName}Listing;
`;

const cssContent = `
.listing-wrapper {
  padding: 20px;
  background-color: #f9f9f9;
}

.column_resizer_body {
  padding: 10px;
}
`;

// Create files in Page folder
createFile(indexFile, indexContent);
createFile(createFilePath, createContent);
createFile(listingFilePath, listingContent);
createFile(cssFilePath, cssContent);

// Define the file names for Redux folder
const apiFilePath = path.join(reduxDir, "api.js");
const thunkFilePath = path.join(reduxDir, "thunk.js");
const sliceFilePath = path.join(reduxDir, `${routeName}Slice.js`);

// Define the content for the Redux files
const apiContent = `import axiosInstance from "../../../Utils/axios";

const BASE_URL = "api/v1/${routeName}-app/${routeName}";

export const getAll${capitalizedRouteName}s = ({postsPerPage,page}) => axiosInstance.get(\`\${BASE_URL}?limit=\${postsPerPage}&page=\${page}\`);
export const get${capitalizedRouteName}s = (postsPerPage) => axiosInstance.get(\`\${BASE_URL}?offset=0&limit=\${postsPerPage}&ordering=-id\`);
export const create${capitalizedRouteName}s = (body) => axiosInstance.post(\`\${BASE_URL}\`, body);
export const update${capitalizedRouteName}s = (id, body) => axiosInstance.patch(\`\${BASE_URL}\/\${id}\`, body);
export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);
export const getPage${capitalizedRouteName}s = (number, postsPerPage) =>
  axiosInstance.get(\`\${BASE_URL}?offset=\${(number - 1) * postsPerPage}&limit=\${postsPerPage}&ordering=-id\`);
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(\`\${BASE_URL}?offset=0&limit=\${postsPerPage}&search=\${search}\`);
`;

const thunkContent = `import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./api";

const sliceName = "${capitalizedRouteName}";
const types = [
  \`get\${sliceName}\`,
  \`getAll\${sliceName}\`,
  \`create\${sliceName}\`,
  \`update\${sliceName}\`,
  \`getPage\${sliceName}\`,
];

const createThunk = (type, apiCall) =>
  createAsyncThunk(\`${routeName.toLowerCase()}/\${type}\`, async (arg, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(arg);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.errors[0]?.error);
    }
  });

export const get${capitalizedRouteName}s = createThunk(\`\${types[0]}\`, API.get${capitalizedRouteName}s);
export const getAll${capitalizedRouteName}s = createThunk(\`\${types[1]}\`, ({postsPerPage,page})=>API.getAll${capitalizedRouteName}s({postsPerPage,page}));
export const create${capitalizedRouteName}s = createThunk(\`\${types[2]}\`, (data) => API.create${capitalizedRouteName}s(JSON.stringify(data)));
export const update${capitalizedRouteName}s = createThunk(\`\${types[3]}\`, ({ id, values }) => API.update${capitalizedRouteName}s(id, values));

export const getPage${capitalizedRouteName}s = createThunk(\`\${types[4]}\`, ({ number, postsPerPage }) =>
  API.getPage${capitalizedRouteName}s(number, postsPerPage)
);

export const getPrevious = createThunk("getPrevious", API.getPrevious);
export const getNext = createThunk("getNext", API.getNext);

export const handleSearch = createThunk("handleSearch", ({ search, postsPerPage }) =>
  API.handleSearch(search, postsPerPage)
);
`;

const sliceContent = `import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { create${capitalizedRouteName}s, getAll${capitalizedRouteName}s, get${capitalizedRouteName}s, getNext, handleSearch, update${capitalizedRouteName}s } from "./thunk";

const initialState = {
  ${routeName}s: [],
  ${routeName}: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
  loading${capitalizedRouteName}: false,
  loadingNext: false,
};

export const ${routeName}sSlice = createSlice({
  name: "${routeName}",
  initialState,
  reducers: {
    ${routeName}sEditSuccess: (state, action) => {
      state.edit = true;
      state.${routeName} = state.${routeName}s.find((${routeName}) => ${routeName}._id === action.payload);
    },
    clearAll${capitalizedRouteName}: (state) => {
      state.edit = false;
      state.loading = false;
      state.loadingUpdated = false;
      state.loading${capitalizedRouteName} = false;
      state.${routeName} = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNext.pending, (state) => {
      state.loadingNext = true;
    });
    builder.addCase(getNext.fulfilled, (state, action) => {
      state.loadingNext = false;
      state.${routeName}s = [...state.${routeName}s, ...action.payload];
      state.next = action.payload.next;
    });
    builder.addCase(getNext.rejected, (state) => {
      state.loadingNext = false;
    });
    builder.addCase(create${capitalizedRouteName}s.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(create${capitalizedRouteName}s.fulfilled, (state, action) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(create${capitalizedRouteName}s.rejected, (state) => {
      state.loading = false;
      state.edit = false;
    });
    builder.addCase(update${capitalizedRouteName}s.pending, (state) => {
      state.loadingUpdated = true;
    });
    builder.addCase(update${capitalizedRouteName}s.fulfilled, (state, action) => {
      state.loadingUpdated = false;
      state.edit = false;
    });
    builder.addCase(update${capitalizedRouteName}s.rejected, (state) => {
      state.loadingUpdated = false;
    });
    builder.addMatcher(isAnyOf(get${capitalizedRouteName}s.pending,getAll${capitalizedRouteName}s.pending, handleSearch.pending), (state) => {
      state.loading${capitalizedRouteName} = true;
    });
    builder.addMatcher(isAnyOf(get${capitalizedRouteName}s.fulfilled, getAll${capitalizedRouteName}s.fulfilled, handleSearch.fulfilled), (state, action) => {
      state.loading${capitalizedRouteName} = false;
      state.${routeName}s = [...state.${routeName}s, ...action.payload?.${routeName}s];
      state.count = action.payload;
      state.previous = action.payload?.previous;
      state.next = action.payload?.hasNextPage;
    });
    builder.addMatcher(isAnyOf(get${capitalizedRouteName}s.rejected, getAll${capitalizedRouteName}s.rejected, handleSearch.rejected), (state) => {
      state.loading${capitalizedRouteName} = false;
    });
  },
});

export const { ${routeName}sEditSuccess, clearAll${capitalizedRouteName} } = ${routeName}sSlice.actions;

export default ${routeName}sSlice.reducer;
`;

// Create files in Redux folder
createFile(apiFilePath, apiContent);
createFile(thunkFilePath, thunkContent);
createFile(sliceFilePath, sliceContent);

console.log(`${capitalizedRouteName} files created successfully.`);
console.log("Developed and Created by: Madmax");
