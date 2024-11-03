import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddSuperheroForm from "../AddSuperheroForm";
import { getSuperheroById } from "../../redux/slices/superheroSlice";

const EditSuperhero = () => {
  const { superheroId } = useParams();
  const dispatch = useDispatch();
  const superhero = useSelector((state) => state.heroes.superhero);
  const isLoading = useSelector((state) => state.heroes.isLoading);
  const error = useSelector((state) => state.heroes.error);

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

  return <AddSuperheroForm superheroData={superhero} isEditing={true} />;
};

export default EditSuperhero;
