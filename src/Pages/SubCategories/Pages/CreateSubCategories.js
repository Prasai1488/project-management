import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Components/Buttons/Button";
import Loader from "../../../Components/Loader";
import { createSubCategory, updateSubCategory, getAllSubCategories } from "../Redux/thunk";
import { errorFunction, successFunction } from "../../../Components/Alert/Alert";
import AsyncSelect from "../../../Components/CommonAsyncSelectField/AsyncSelect";
import axiosInstance from "../../../Utils/axios";

const RANGER_URL = "http://192.168.1.91:8000";

const CreateSubCategory = ({ setShowModal, postsPerPage = 10 }) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const currentSubCategory = useSelector((state) => state?.subCategory?.SubCategory);
  console.log("currentSubCategoryy", currentSubCategory);
  const loadingSubCategory = useSelector((state) => state?.subCategory?.loading);
  const loadingUpdated = useSelector((state) => state?.subCategory?.loadingUpdated);

  const initialState = {
    name: currentSubCategory ? currentSubCategory.name : "",
    category: currentSubCategory ? { label: currentSubCategory.name, value: currentSubCategory.id } : null,
    status: currentSubCategory ? currentSubCategory.status === "Active" : false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Subcategory name is required!"),
    category: Yup.object().required("Category is required!"),
    status: Yup.boolean(),
  });

  // Load categories from API for AsyncSelect
  const loadCategoryOptions = async (inputValue) => {
    try {
      const response = await axiosInstance.get(`${RANGER_URL}/api/v1/product/category/`, {
        params: {
          search: inputValue || "",
        },
      });

      const options = response?.data?.data.map((category) => ({
        label: category?.name,
        value: category?.id,
      }));

      return { options };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { options: [] };
    }
  };

  // Form submission handler
  const onSubmit = (values, { resetForm }) => {
    const updatedValues = {
      name: values.name,
      category: values.category.value,
      status: values.status ? "Active" : "Inactive",
    };

    // Log the values being submitted
    console.log("Submitting values:", updatedValues);

    if (currentSubCategory) {
      // Edit mode: Update subcategory
      dispatch(updateSubCategory({ id: currentSubCategory.id, values: updatedValues }))
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
        enableReinitialize={true} // Reinitialize form values when currentSubCategory changes
      >
        {(formik) => (
          <Form autoComplete="off">
            <div className="create-subcategory-wrapper">
              <div className="header d-flex justify-content-between align-items-center"></div>

              {/* Subcategory Name Field */}
              <div className="form-group">
                <label htmlFor="name">Subcategory Name</label>
                <input
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
                <label htmlFor="category">Category</label>
                <AsyncSelect
                  name="category"
                  cacheOptions
                  defaultOptions
                  loadOptions={loadCategoryOptions}
                  onChange={(selectedOption) => formik.setFieldValue("category", selectedOption)} // Handle Formik value
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
                title={currentSubCategory ? "Update" : "Save"}
                content={currentSubCategory ? "Update" : "Save"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateSubCategory;
