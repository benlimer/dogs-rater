import React, { useState } from "react";

const DogReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    description: "",
    rating: "",
  });

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postReview(newReview);
    setNewReview({
      description: "",
      rating: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add new review
        <input
          type="text"
          name="description"
          onChange={handleInputChange}
          value={newReview.description}
        />
      </label>
      <label>
        Rating
        <input type="number" name="rating" onChange={handleInputChange} value={newReview.rating} />
      </label>
      <input className="button" type="submit" value="Submit" />
    </form>
  );
};

export default DogReviewForm;
