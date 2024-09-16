import { Form } from "formik";
import Button from "../Buttons/Button";
import "./FormWrapper.css";

const FormWrapper = ({ children, loading, loadingUpdated, edit }) => {
  return (
    <Form autoComplete="off" autoSave="off"> 
      <div className="create-form-wrapper">
        <div className="row">{children}</div>
      </div>
      <div className="col-12 p-0 text-right">
        <div className="mt-3 d-flex justify-content-end align-items-center">
          <Button
            btnType="submit"
            className="btn create-button"
            createButton={true}
            disabled={edit ? loadingUpdated : loading}
            title={"Save"}
            content={"Save"}
          />
        </div>
      </div>
    </Form>
  );
};

export default FormWrapper;
