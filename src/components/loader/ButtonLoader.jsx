import React from "react";

export default function ButtonLoader({texto}) {
  return (
    <button className="--btn --btn-secondary" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm p-2 mx-2"
        aria-hidden="true"
      ></span>
      <span role="status">{texto}</span>
    </button>
  );
}
