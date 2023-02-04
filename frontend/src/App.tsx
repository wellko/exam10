import React from 'react';
import MainPage from "./features/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import NewsPage from "./features/NewsPage/NewsPage";
import NewsForm from "./features/NewsForm/NewsForm";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/news/:id'} element={<NewsPage/>}/>
            <Route path={'/news/add'} element={<NewsForm/>}/>
        </Routes>
    </div>
  );
}

export default App;
