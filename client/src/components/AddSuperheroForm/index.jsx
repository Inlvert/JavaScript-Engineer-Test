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
    .matches(/^[a-zA-Zа-яА-ЯЄєЇї0-9 _-]{1,16}$/, "Nickname must be 1-16 characters long and contain letters and numbers only")
    .required("Nickname is required"),
  realName: Yup.string(),
  originDescription: Yup.string(),
  superpowers: Yup.string().required("Superpowers is required"),
  catchPhrase: Yup.string(),
  images: Yup.array()
    .max(10, "You can upload up to 10 images only")
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
          <TextField name="nickname" placeholder="Nickname"/>
          <TextField name="realName" placeholder="Real Name"/>
          <TextField name="originDescription" type="textarea" placeholder="Origin Description"/>
          <TextField name="superpowers" placeholder="Superpowers"/>
          <TextField name="catchPhrase" placeholder="Catch Phrase"/>
          <ImageUpload setFieldValue={setFieldValue} values={values} resetForm={resetForm} />
          <button type="submit" className={style.btn}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddSuperheroForm;
