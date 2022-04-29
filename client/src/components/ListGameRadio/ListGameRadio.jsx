import React from 'react';

function ListGameRadio(props) {
  return (
    <div>
      <li>
        <label htmlFor="r-1">
          <input type="radio" id={ } name="r" />
          <span className="i">Icon</span>
          <h3>Title</h3>
          <h3 className="h3-unsure">Title unsure</h3>
          <p>text</p>
        </label>
      </li>
    </div>
  );
}

export default ListGameRadio;
