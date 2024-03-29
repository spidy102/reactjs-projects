import React from "react";

export default function Card(props) {
  let desc = "";
  props.ing.forEach((element) => {
    desc += element.text + ",";
  });
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image">
          <img src={props.img} />
          <span className="card-title">{props.title}</span>
        </div>
        <div className="card-Namecontent">
          {console.log(props.ing)}
          <p>Ingredients</p>
          <p>{desc}</p>
        </div>
        <div className="card-action center-align">
          <a href={props.url} className="btn waves-effect yellow">
            Recipe
          </a>
        </div>
      </div>
    </div>
  );
}
