import React from "react";
import { useFormik } from "formik";

function YoutubeForm() {
  const formik = useFormik({
    initialValues: {
      name: "Devesh",
      email: "",
      channel: "",
    },
    onSubmit: (values) => {
      console.log("Form Data", values);
    },
    validate: values=> {

      //values.name values.email values.channel
      //error.name error.email error.channel

      let errors = {}

      if(!values.name)
      {
        errors.name = 'Required'
      }
      if(!values.email)
      {
        errors.email = 'Required'
      }
      else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
      {
        errors.email = 'Invalid email format'
      }

      if(!values.channel)
      {
        errors.channel = 'Required'
      }
      
      return errors
    },
  });

  //console.log("Formik Values", formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            value={formik.values.channel}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
