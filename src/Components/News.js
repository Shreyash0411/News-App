import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {


  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} InsightIQ`
  }


  async update(){

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a71d4072cd6a4ecb9ad6423e4ffc1580&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

    
  }

  

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a71d4072cd6a4ecb9ad6423e4ffc1580&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }


  handleNext = async () => {
    await this.setState({
      page : this.state.page +1
    })

    this.update();

  }

  handlePrevious = async () => {
    await  this.setState({
      page : this.state.page -1
    })

    this.update();
  }


  render() {
    return (
      <div className='container my-3'>
        <br />
        <h2 className='my-3 text-center' > InsightIQ - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((Element) => {
            return <div className='col-md-4' key={Element.url}>
              <Newsitem title={Element.title ? Element.title : ""} description={Element.description ? Element.description : ""}
                imageUrl={Element.urlToImage ? Element.urlToImage : "https://media.9news.com/assets/KUSA/images/a060fe50-b5c2-4b50-92ed-1b6e23e19e5e/a060fe50-b5c2-4b50-92ed-1b6e23e19e5e_1140x641.jpg"}
                newsUrl={Element.url} author={Element.author ? Element.author : "Unknown"} dates={Element.publishedAt} source = {Element.source.name} />
            </div>
          })}
        </div>

        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}> Next &rarr;</button>
        </div>
      </div>
    )
  }
}
export default News