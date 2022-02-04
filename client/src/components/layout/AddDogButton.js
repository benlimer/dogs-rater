import React from "react";
import { Link } from "react-router-dom";

const AddDogButton = () => {
  return (
    <Link className="button" to="/dogs/new">
      Add your dog
    </Link>
  );
};
export default AddDogButton;
