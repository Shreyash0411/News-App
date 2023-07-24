import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export default function News(props){

  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  

   const update = async ()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    update();

  },[])
  

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)

  };


    return (
      <>
        <br /><br />  
        <h2 className="my-3 text-center">
          {" "}
          InsightIQ - Top {capitalizeFirstLetter(props.category)}Headlines
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((Element) => {
                return (
                  <div className="col-md-4" key={Element.url}>
                    <Newsitem
                      title={Element.title ? Element.title : ""}
                      description={Element.description ? Element.description : ""}
                      imageUrl={Element.urlToImage? Element.urlToImage: "https://media.9news.com/assets/KUSA/images/a060fe50-b5c2-4b50-92ed-1b6e23e19e5e/a060fe50-b5c2-4b50-92ed-1b6e23e19e5e_1140x641.jpg"}
                      newsUrl={Element.url}
                      author={Element.author ? Element.author : "Unknown"}
                      dates={Element.publishedAt}
                      source={Element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}


News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

