import React from "react";
import "../App.css";

const Scorecard = (props) => {
  const hearts = [];

  for (let i = 0; i < props.life; i++) {
    hearts.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="red"
        class="bi bi-heart-fill"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
    );
  }

  return <div className="lives">{hearts}</div>;
};

export default Scorecard;
