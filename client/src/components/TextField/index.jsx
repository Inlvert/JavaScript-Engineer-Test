import React from "react";
import { Field, ErrorMessage } from "formik";
import style from './TextField.module.scss'

const TextField = ({ name, type = "text" }) => {
  return (
    <div className={style.wrapper}>
      <Field type={type} placeholder={name} name={name} className={style.textInput} />
      <ErrorMessage name={name} component="div" className={style.err} />
    </div>
  );
};

export default TextField;
