import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "Devesh",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required(`Name Required`),
  email: Yup.string().email(`Invalid email format`).required(`Email Required`),
  channel: Yup.string().required(`Channel Required`),
});

function OldYoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email">
            {(errorMessage) => <div className="error">{errorMessage}</div>}
          </ErrorMessage>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" />
        </div>
        <div className="form-control">
          <label htmlFor="channel">Comments</label>
          <Field as="textarea" id="comments" name="comments" />
          <ErrorMessage name="channel" />
        </div>
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <FastField id="address" name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log(`Render Props`, props)
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </FastField>
        </div>
        {/*----------nested object introducton-------*/}
        <div className="form-control">
          <label htmlFor="facebook">Facebook Profile</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter Profile</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>
        {/*----------Array component introducton-------*/}
        <div className="form-control">
          <label htmlFor="primaryPh">Primary Phone Number</label>
          <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
        </div>
        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary Phone Number</label>
          <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
        </div>

        {/*----------Array component introducton-------*/}
        <div className="form-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers">
            {
            (fieldArrayProps)=>{
              /*console.log(`Field Array Props`,fieldArrayProps)*/
              
              const {push, remove, form} = fieldArrayProps
              const { values } = form
              const { phNumbers } = values

              return <div>
                {
                  phNumbers.map((phNumber, index)=>(
                    <div key={index}>
                      <Field name={`phNumbers[${index}]`} />
                      {index > 0 && <button type="button" onClick={()=>remove(index)}> - </button>}
                      <button type="button" onClick={()=>push(``)}> + </button>
                    </div>
                  ))
                }
              </div>
            }
            }
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default OldYoutubeForm;
