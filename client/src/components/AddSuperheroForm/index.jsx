import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import ImageUpload from "../ImageUpload";
import { useDispatch } from "react-redux";
import {
  createSuperhero,
  updateSuperheroById,
} from "../../redux/slices/superheroSlice";
import style from "./AddSuperheroForm.module.scss";

const validationSchema = Yup.object({
  nickname: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-ЯЄєЇї0-9 _-]{1,16}$/,
      "Nickname must be 1-16 characters long and contain letters and numbers only"
    )
    .required("Nickname is required"),
  realName: Yup.string(),
  originDescription: Yup.string(),
  superpowers: Yup.string().required("Superpowers is required"),
  catchPhrase: Yup.string(),
  images: Yup.array()
    .max(10, "You can upload up to 10 images only")
    .of(
      Yup.mixed().test(
        "fileSize",
        "File too large",
        (file) => !file || file.size <= 5000000
      )
    ),
});

const AddSuperheroForm = ({ superheroData, isEditing, onClose }) => {
  const dispatch = useDispatch();

  const initialValues = isEditing
    ? {
        nickname: superheroData.nickname || "",
        realName: superheroData.realName || "",
        originDescription: superheroData.originDescription || "",
        superpowers: superheroData.superpowers || "",
        catchPhrase: superheroData.catchPhrase || "",
        images: [],
      }
    : {
        nickname: "",
        realName: "",
        originDescription: "",
        superpowers: "",
        catchPhrase: "",
        images: [],
      };

  const handleSubmit = async (values, formikBag) => {
    const formData = new FormData();
    formData.append("nickname", values.nickname);
    formData.append("realName", values.realName);
    formData.append("originDescription", values.originDescription);
    formData.append("superpowers", values.superpowers);
    formData.append("catchPhrase", values.catchPhrase);
    values.images.forEach((file) => formData.append("images", file));

    try {
      if (isEditing) {
        dispatch(updateSuperheroById({superheroId: superheroData._id, superheroData: formData}));
      } else {
        dispatch(createSuperhero(formData));
      }
      console.log("Superhero processed successfully");
      formikBag.resetForm();
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error processing superhero", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className={style.wrapper}>
          <h3 className={style.text}>
            {isEditing ? "EDIT SUPERHERO" : "ADD SUPERHERO"}
          </h3>
          <TextField name="nickname" placeholder="Nickname" />
          <TextField name="realName" placeholder="Real Name" />
          <TextField
            name="originDescription"
            type="textarea"
            placeholder="Origin Description"
          />
          <TextField name="superpowers" placeholder="Superpowers" />
          <TextField name="catchPhrase" placeholder="Catch Phrase" />
          <ImageUpload setFieldValue={setFieldValue} values={values} />
          <button type="submit" className={style.btn}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddSuperheroForm;
