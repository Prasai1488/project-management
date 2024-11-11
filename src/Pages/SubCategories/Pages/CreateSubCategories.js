import React, { useRef } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createSubCategory, updateSubCategory, getAllSubCategories } from "../Redux/thunk";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import { loadCategoryOptions } from "../../../Utils/asyncFunction";
import TextField from "../../../Components/TextField/TextField";
import "./subCategory.css";

const CreateSubCategory = ({ setShowModal, postsPerPage = 10 }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const subCategory = useSelector((state) => state?.subCategory?.subCategory);
  console.log(subCategory, "subcatefjgnj");
  const loadingSubCategory = useSelector((state) => state?.subCategory?.loading);
  const loadingUpdated = useSelector((state) => state?.subCategory?.loadingUpdated);

  // Initial values setup based on whether it's an update or create mode
  const initialState = {
    name: subCategory ? subCategory?.name : "",
    category: subCategory ? { label: subCategory?.category?.name, value: subCategory?.category?.id } : null,
    status: subCategory ? subCategory?.status === "Active" : false,
  };

  // Validation schema using Yup0
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Subcategory name is required!"),
    category: Yup.object().required("Category is required!"),
    status: Yup.boolean(),
  });

  // Form submission handler
  const onSubmit = (values, { resetForm }) => {
    const updatedValues = {
      name: values.name,
      category: values.category.value,
      status: values.status ? "Active" : "Inactive",
    };

    // Check if we are in create or update mode
    if (subCategory) {
      // Edit mode: Update subcategory
      dispatch(updateSubCategory({ id: subCategory.id, values: updatedValues }))
        .unwrap()
        .then(() => {
          successFunction("Subcategory updated successfully.");
          dispatch(getAllSubCategories(postsPerPage));
          setShowModal(false);
          resetForm();
        })
        .catch((error) => {
          errorFunction(error);
        });
    } else {
      // Create mode: Create new subcategory
      dispatch(createSubCategory(updatedValues))
        .unwrap()
        .then(() => {
          successFunction("Subcategory created successfully.");
          dispatch(getAllSubCategories(postsPerPage));
          setShowModal(false);
          resetForm();
        })
        .catch((error) => {
          errorFunction(error);
        });
    }
  };

  return (
    <>
      {(loadingSubCategory || loadingUpdated) && <Loader />}
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form autoComplete="off">
            <div className="create-subcategory-wrapper p-3">
              <div className="form-group">
                <TextField
                  label="Subcategory Name"
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>

              {/* AsyncSelect Category Field */}
              <div className="form-group">
                <AsyncSelect
                  label="Category"
                  name="category"
                  cacheOptions
                  defaultOptions
                  loadOptions={loadCategoryOptions}
                  onChange={(selectedOption) => formik.setFieldValue("category", selectedOption)}
                  value={formik.values.category}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
                {formik.touched.category && formik.errors.category && (
                  <div className="invalid-feedback">{formik.errors.category?.label || formik.errors.category}</div>
                )}
              </div>
              {/* Status Checkbox */}
              <div className="d-flex justify-content-center align-items-center">
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  checked={formik.values.status}
                />
                <label htmlFor="status" className="p-2 custom-margin">
                  Active
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-end align-items-center">
              <Button
                btnType="submit"
                className="btn create-button"
                createButton={true}
                title={subCategory ? "Update" : "Save"}
                content={subCategory ? "Update" : "Save"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateSubCategory;



// import React, { useRef, useState, useEffect } from "react";
// import { Formik, Form } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import Button from "../../../Components/Buttons/Button";
// import Loader from "../../../Components/Loader";

// import { createSubCategory, updateSubCategory, getAllSubCategories } from "../Redux/thunk";
// import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
// import { renderTextField } from "../../../Utils/customFields";

// const CreateSubCategory = ({ setShowModal, postsPerPage = 10 }) => {
//   const formRef = useRef();
//   const dispatch = useDispatch();

//   const currentSubCategory = useSelector((state) => state?.subCategory?.subCategory);
//   const loading = useSelector((state) => state?.subCategory?.loading);
//   const loadingUpdated = useSelector((state) => state?.subCategory?.loadingUpdated);
//   const edit = useSelector((state) => state?.subCategory?.edit);


//   // Form initial state
//   const initialState = {
//     name: edit ? subCategory?.name : "",
//     category: edit ? { label: subCategory?.category?.name, value: subCategory?.category?.id } : null,
//     status: edit ? subCategory?.status === "Active" : false,
//   };


//   // Validation schema
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Subcategory name is required!"),
//     category: Yup.object().required("Category is required!"),
//     status: Yup.boolean(),
//   });
 

 

//   // Form submission logic
//   const onSubmit = (values, { resetForm }) => {
//     const updatedValues = {
//       name: values.name,
//       category: values.category.value,
//       status: values.status ? "Active" : "Inactive",
//     };

//     // Check if we are in create or update mode
//     if (edit) {
//       // Edit mode: Update subcategory
//       dispatch(updateSubCategory({ id: subCategory.id, values: updatedValues }))
//         .unwrap()
//         .then(() => {
//           successFunction("Subcategory updated successfully.");
//           dispatch(getAllSubCategories(postsPerPage));
//           setShowModal(false);
//           resetForm();
//         })
//         .catch((error) => {
//           errorFunction(error);
//         });
//     } else {
//       // Create mode: Create new subcategory
//       dispatch(createSubCategory(updatedValues))
//         .unwrap()
//         .then(() => {
//           successFunction("Subcategory created successfully.");
//           dispatch(getAllSubCategories(postsPerPage));
//           setShowModal(false);
//           resetForm();
//         })
//         .catch((error) => {
//           errorFunction(error);
//         });
//     }
//   };


//   return (
//     <>
//       {(loading || loadingUpdated) && <Loader />}
//       <Formik
//         initialValues={initialState}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//         innerRef={formRef}
//         enableReinitialize
//       >
//         {(formik) => (
//           <Form autoComplete="off">
//             <div className="create-subCategory-wrapper">
//               <div className="col-12  d-flex justify-content-center">
//                 <div>
//                   <Dropzone
//                     name="image"
//                     label="Category Image"
//                     onChange={handleImageChange}
//                     removePhoto={removeImage}
//                     displayImage={imagePreview}
//                   />
//                   {formik.touched.image && formik.errors.image ? (
//                     <div className="invalid-feedback">{formik.errors.image}</div>
//                   ) : null}
//                 </div>
//               </div>

//               {renderTextField(formik, 12, "name", "text", "Name", true)}
//             </div>

//             <div className="d-flex justify-content-end align-items-center mt-3">
//               <Button
//                 btnType="submit"
//                 className="btn create-button"
//                 title={edit ? "Update" : "Save"}
//                 content={edit ? "Update" : "Save"}
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default CreateSubCategory;
