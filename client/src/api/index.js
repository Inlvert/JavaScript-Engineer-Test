import axios from "axios";
import CONSTANTS from "../constants";

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

export const createSuperhero = async (superheroData) => {
  const response = await httpClient.post(`/superheroes`, superheroData);
  return response;
};
