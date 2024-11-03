import React from "react";
import Header from "../../components/Header";
import AddSuperheroForm from "../../components/AddSuperheroForm";

const AddSuperhero = () => {
  return (
    <div style={{ backgroundColor: "#242424", height: "100vh" }}>
      <Header />
      <div style={{ padding: "100px" }}>
        <AddSuperheroForm />
      </div>
    </div>
  );
};

export default AddSuperhero;
