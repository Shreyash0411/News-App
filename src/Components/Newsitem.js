import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    // let {title, description,imageUrl, newsUrl}  = this.props ;
    return (
      <div className="my-3">
        <div className="card">
              <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%", zIndex:1}}>
                {this.props.source}
              </span>
          <img src={this.props.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> 
              {this.props.title}
            </h5>
            <p className="card-text">{this.props.description}</p>
            <p className="card-text">               
              <small className="text-muted">
                By : {this.props.author} On :{" "}
                {new Date(this.props.dates).toGMTString()}
              </small>{" "}
            </p>
            <a
              rel="noreferrer"
              href={this.props.newsUrl}
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
}

export default Newsitem;
