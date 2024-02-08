import React, { useEffect, useState } from "react";
import "./logo.css";
import Navbar from "./Navbar";

const News = () => {
  const apiKey = "1ab5ba2406a74b0fbb3a33442d4f8a5f";
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  const apiUrlNews = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`;

  const [apiData, setApiData] = useState([]);
  const [apiDataNews, setApiDataNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBusinessNews, setShowBusinessNews] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(showBusinessNews ? apiUrlNews : apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        if (showBusinessNews) {
          setApiData([]);
          setApiDataNews(data.articles);
        } else {
          setApiData(data.articles);
          setApiDataNews([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setApiData([]);
        setApiDataNews([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, apiUrlNews, showBusinessNews]);

  const handleToggleNews = () => {
    setShowBusinessNews(!showBusinessNews);
  };

  return (
    <div>
      <Navbar />
      <div className="text-center py-3">
        <div className="d-flex align-items-center justify-content-center mx-3">
          <h4 className="mx-2">News</h4>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={handleToggleNews}
            />
          </div>
          <h4 className="mx-2">Business-News</h4>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {showBusinessNews
              ? apiDataNews.map((article, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <div className="card border-primary">
                      <img
                        height="150"
                        src={article.urlToImage}
                        className="card-img-top"
                        alt={article.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Read More
                        </a>
                      </div>
                      <p className="card-body">
                        <b>Published At:</b> {new Date(article.publishedAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                ))
              : apiData.map((article, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <div className="card border-primary">
                      <img
                        height="150"
                        src={article.urlToImage}
                        className="card-img-top"
                        alt={article.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Read More
                        </a>
                      </div>
                      <p className="card-body">
                        <b>Published At: </b>{new Date(article.publishedAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
