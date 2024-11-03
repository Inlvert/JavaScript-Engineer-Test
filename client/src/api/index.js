import axios from "axios";
import CONSTANTS from "../constants";

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
    currentPage: +response.data.currentPage,
  };
};

export const getSuperheroById = async (superheroId) => {
  const response = await httpClient.get(`/superheroes/${superheroId}`);
  return response;
};

export const updateSuperheroById = async ({superheroId, superheroData}) => {
  const response = await httpClient.put(`/superheroes/${superheroId}`, superheroData);
  return response;
};

export const deleteSuperheroById = async (superheroId) => {
  const response = await httpClient.delete(`/superheroes/${superheroId}`);
  return response;
}