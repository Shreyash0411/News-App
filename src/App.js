import "./App.css";

import React, { useState} from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";

import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Main, Route, Routes } from "react-router-dom";

export default function App() {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API

  
  const[progress, setProgress] = useState(0)
 
    return (
      <>
        <Main>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={progress}
            height={4}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="general" category="general" />}/>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="business" category="business" />}/>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="entertainment" category="entertainment"/>}/>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="health" category="health" />}/>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="science" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="sports" category="sports" />}/>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" key="technology" category="technology" />}/>
          </Routes>
        </Main>
      </>
    );
  }

