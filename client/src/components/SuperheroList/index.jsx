import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSuperheroes,
  nextPage,
  prevPage,
  deleteSuperheroById,
} from "../../redux/slices/superheroSlice";
import CONSTANTS from "../../constants";
import style from "./SuperheroList.module.scss";
import placeholderImg from "../../assets/placeholder.png";

const SuperheroList = () => {
  const dispatch = useDispatch();

  const { superheroes, currentPage, totalPages, isLoading, error } =
    useSelector((state) => state.heroes);

  useEffect(() => {
    dispatch(getSuperheroes(currentPage));
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(nextPage());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(prevPage());
    }
  };

  const hendelDeleteSyperhero = async (superheroId) => {
    await dispatch(deleteSuperheroById(superheroId));
    console.log(superheroId);
    dispatch(getSuperheroes(currentPage));
  };

  return (
    <div className={style.cover}>
      <h1>Superheroes</h1>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1} className={style.btn}>
          Prev
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={style.btn}>
          Next
        </button>
      </div>
      {isLoading ? (
        <p>Loading superheroes...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className={style.ul}>
          {superheroes && superheroes.length > 0 ? (
            superheroes.map((superhero) => (
              <li key={superhero._id} className={style.li}>
                <Link to={`/superheroes/${superhero._id}`}>
                  <div className={style.wrapper}>
                    <img
                      src={
                        superhero.images && superhero.images.length > 0
                          ? `${CONSTANTS.HTTP_SERVER_URL}/images/${superhero.images[0]}`
                          : placeholderImg
                      }
                      alt={superhero.nickname}
                      className={style.img}
                    />
                    <h3 className={style.name}>{superhero.nickname}</h3>
                  </div>
                </Link>
                <button onClick={() => hendelDeleteSyperhero(superhero._id)}>
                  Del
                </button>
              </li>
            ))
          ) : (
            <li>No superheroes available.</li>
          )}
        </ul>
      )}
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default SuperheroList;
