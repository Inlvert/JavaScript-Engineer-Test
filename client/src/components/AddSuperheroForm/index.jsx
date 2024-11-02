import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import ImageUpload from "../ImageUpload";
import { useDispatch } from "react-redux";
import { createSuperhero } from "../../redux/slices/superheroSlice";
import style from './AddSuperheroForm.module.scss'

const initialValues = {
  nickname: "",
  realName: "",
  originDescription: "",
  superpowers: "",
  catchPhrase: "",
  images: [],
};

const validationSchema = Yup.object({
  nickname: Yup.string()
    .matches(/^[a-zA-Z0-9_-]{1,16}$/, "Nickname must be 1-16 characters long and contain letters and numbers only")
    .required("Nickname is required"),
  realName: Yup.string(),
  originDescription: Yup.string(),
  superpowers: Yup.string().required("Superpowers are required"),
  catchPhrase: Yup.string(),
  images: Yup.array()
    .max(5, "You can upload up to 5 images only")
    .of(Yup.mixed().test("fileSize", "File too large", (file) => !file || file.size <= 5000000)),
});

const AddSuperheroForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, formikBag) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "images") {
        values.images.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await dispatch(createSuperhero(formData));
      console.log("Superhero created successfully", response);
      formikBag.resetForm();
    } catch (error) {
      console.error("Error creating superhero", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, resetForm }) => (
        <Form className={style.wrapper}>
          <h3 className={style.text}>ADD SUPERHERO</h3>
          <TextField label="Nickname" name="nickname" />
          <TextField label="Real Name" name="realName" />
          <TextField label="Origin Description" name="originDescription" type="textarea" />
          <TextField label="Superpowers" name="superpowers" />
          <TextField label="Catch Phrase" name="catchPhrase" />
          <ImageUpload setFieldValue={setFieldValue} values={values} resetForm={resetForm} />
          <button type="submit" className={style.btn}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddSuperheroForm;
