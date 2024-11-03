import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./SuperheroDetails.module.scss";
import { getSuperheroById } from "../../redux/slices/superheroSlice";
import CONSTANTS from "../../constants";
import Header from "../Header";

const SuperheroDetails = () => {
  const { superheroId } = useParams();
  const dispatch = useDispatch();
  const superhero = useSelector((state) => state.heroes.superhero);

  useEffect(() => {
    dispatch(getSuperheroById(superheroId));
  }, [dispatch, superheroId]);

  if (!superhero) {
    return <p>Superhero not found.</p>;
  }

  return (
    <>
      <Header />
      <div className={style.superheroDetails}>
        <h1>{superhero.nickname}</h1>
        {superhero.images && superhero.images.length > 0 ? (
          <img
            src={`http://localhost:5000/images/${superhero.images[0]}`}
            alt={superhero.nickname}
          />
        ) : (
          <p>No image available</p>
        )}
        <p>Real Name: {superhero.real_name}</p>
        <p>Description: {superhero.originDescription}</p>
        {/* Інша інформація про героя */}
      </div>
    </>
  );
};

export default SuperheroDetails;
