import React, { useEffect, useState } from "react"; // Додано useState
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./SuperheroDetails.module.scss";
import { getSuperheroById } from "../../redux/slices/superheroSlice";
import Header from "../../components/Header";
import AddSuperheroForm from "../AddSuperheroForm";
import CONSTANTS from "../../constants";

const SuperheroDetails = () => {
  const { superheroId } = useParams();
  const dispatch = useDispatch();
  const superhero = useSelector((state) => state.heroes.superhero);
  const isLoading = useSelector((state) => state.heroes.isLoading);
  const error = useSelector((state) => state.heroes.error);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (superheroId) {
      dispatch(getSuperheroById(superheroId));
    }
  }, [dispatch, superheroId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!superhero) {
    return <p>Superhero not found.</p>;
  }

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div className={style.cover}>
      <Header />
      <div className={style.superheroDetails}>
        <h1>{superhero.nickname}</h1>
        {superhero.images && superhero.images.length > 0 && (
          <div className={style.existingImages}>
            {superhero.images.map((image, index) => (
              <div key={index} className={style.position}>
                <img
                  src={`${CONSTANTS.HTTP_SERVER_URL}images/${image}`}
                  alt={`Existing ${index + 1}`}
                  className={style.previews}
                />
              </div>
            ))}
          </div>
        )}
        <h3>Real Name: {superhero.realName}</h3>
        <h3>Description: {superhero.originDescription}</h3>
        <h3>Superpowers: {superhero.superpowers}</h3>
        <h3>Catch phrase: {superhero.catchPhrase}</h3>
        
        <button onClick={toggleEdit}>Edit Superhero</button>
        {isEditing && (
          <AddSuperheroForm
            superheroData={superhero}
            isEditing={true}
            onClose={toggleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default SuperheroDetails;
