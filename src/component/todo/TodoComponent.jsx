import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveTodoApi } from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { Field, Form, Formik } from "formik";

function TodoComponent() {
  const { id } = useParams();
  const { username } = useAuth();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  function retrieveTodo() {
    retrieveTodoApi(username, id)
      .then((respo) => {
        console.log(respo);
        setDescription(respo.data.description);
        setTargetDate(respo.data.targetDate);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => retrieveTodo(), [id]);

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Enter Todo Details</h1>

      <div className="mb-5 text-center">
        <h6 style={{ textDecoration: "green wavy underline" }}>
          Description: <span>{description}</span>
        </h6>
      </div>

      <div className="row justify-content-center">
        <div className="col-md">
          <Formik
            initialValues={{
              description,
              targetDate,
            }}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="form-group row mb-3">
                <label className="col-md-6 col-form-label">Description</label>
                <div className="col-sm-4">
                  <Field
                    type="text"
                    className="form-control"
                    name="description"
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-md-6 col-form-label">Target Date</label>
                <div className="col-sm-4">
                  <Field
                    type="date"
                    className="form-control"
                    name="targetDate"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-4 offset-sm-4">
                  <button type="submit" className="btn btn-success m-5">
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
