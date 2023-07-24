import React from "react";

export default function Newsitem(props) {
  
     let {title, description,imageUrl, newsUrl, author, dates, source}  = props ;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display : "flex", justifyContent : "flex-end", position : "absolute", right : '0' }}>
              <span className="badge rounded-pill bg-danger" style={{left:"90%", zIndex:1}}>
                {source}
              </span>
            </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> 
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">               
              <small className="text-muted">
                By : {author} On :{" "}
                {new Date(dates).toGMTString()}
              </small>{" "}
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more..
            </a>
          </div>
        </div>
      </div>
    );
  
}


