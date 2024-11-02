import React from "react";
import Header from "../../components/Header";
import AddSuperheroForm from "../../components/AddSuperheroForm";

const AddSuperhero = () => {
  return (
    <div>
      <Header />
      <h1>AddSuperhero</h1>
      <AddSuperheroForm />
    </div>
  );
};

export default AddSuperhero;
