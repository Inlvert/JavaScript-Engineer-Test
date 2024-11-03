import React, { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import style from "./ImageUpload.module.scss";

const ImageUpload = ({ setFieldValue, values }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Очищуємо об'єктні URL при зміні зображень або розмонтовуванні компонента
    return () => {
      imagePreviews.forEach((src) => {
        if (src.startsWith("blob:")) {
          URL.revokeObjectURL(src);
        }
      });
    };
  }, [imagePreviews]);

  useEffect(() => {
    if (values.images.length === 0) {
      setImagePreviews([]);
    }
  }, [values.images]);

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const existingFiles = values.images || [];
    const updatedFiles = existingFiles.concat(newFiles).slice(0, 10);

    setFieldValue("images", updatedFiles);
    const updatedPreviews = updatedFiles.map((file) =>
      file instanceof File ? URL.createObjectURL(file) : null 
    ).filter(Boolean); 
    setImagePreviews(updatedPreviews);
  };

  const handleRemoveImage = (index) => {
    const newImages = values.images.filter((_, i) => i !== index);
    setFieldValue("images", newImages);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  return (
    <div>
      <div className={style.wrapper}>
        <label htmlFor="images" className={style.chooseFile}>
          Add Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
      <ErrorMessage name="images" />

      {imagePreviews.length > 0 && (
        <div className={style.cover}>
          {imagePreviews.map((src, index) => (
            <div key={index} className={style.position}>
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className={style.previews}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className={style.btn}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 