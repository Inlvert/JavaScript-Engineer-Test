import axios from "axios";
import CONSTANTS from "../constants";
import { createAction } from "@reduxjs/toolkit";

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

export const createSuperhero = async (superheroData) => {
  const response = await httpClient.post(`/superheroes`, superheroData);
  return response;
};

export const getSuperheroes = async (page) => {
  const response = await httpClient.get(`/superheroes?page=${page}`);
  return {
    data: response.data.data,
    totalPages: response.data.totalPages,
    currentPage: +(response.data.currentPage),
  };
};
