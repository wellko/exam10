import React from 'react';
import MainPage from "./features/MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import NewsPage from "./features/NewsPage/NewsPage";
import NewsForm from "./features/NewsForm/NewsForm";
import NavBar from "./components/UI/NavBar/NavBar";

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Routes>
            <Route path={'*'} element={<h1>Page not Found</h1>}/>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/news/:id'} element={<NewsPage/>}/>
            <Route path={'/news/add'} element={<NewsForm/>}/>
        </Routes>
    </div>
  );
}

export default App;
