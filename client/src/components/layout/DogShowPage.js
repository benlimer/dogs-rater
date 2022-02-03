import React, { useState, useEffect } from "react";
import Link from "react-dom";
import ReviewTile from "./ReviewTile";
import Fetcher from "./services/Fetcher.js";

const DogShowPage = (props) => {
  const [dog, setDog] = useState({});
  const [reviews, setReviews] = useState([]);
  const dogId = props.match.params.id;

  const getDog = async () => {
    try {
      const response = await fetch(`/api/v1/dogs/${dogId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setDog(body.dog);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getReviews = async () => {
    const response = await Fetcher.get(`/api/v1/reviews/${dogId}`);
    if (response.ok) {
      setReviews(response.data.reviews);
    }
  };
  const getPageData = async () => {
    getDog();
    getReviews();
  };

  useEffect(() => {
    getPageData();
  }, []);

  const reviewsList = reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        userName={review.userName}
        description={review.description}
        rating={review.rating}
      />
    );
  });

  let dogDescription = "";
  if (dog.description) {
    dogDescription = <p>{dog.description}</p>;
  }

  return (
    <div className="grid-container">
      <h1>{dog.dogName}</h1>
      <div className="grid-x grid-margin-x grid-padding-x">
        <div className="cell small-12 large-6 dog-show fixed-container">
          {dogDescription}
          <img src={dog.pictureUrl} alt="Dog image" className="dog-image" />
        </div>
        <div className="cell small-12 large-6">{reviewsList}</div>
      </div>
    </div>
  );
};

export default DogShowPage;
