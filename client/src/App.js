import React, {useEffect} from 'react';
import './App.css';
import axios from 'axios';
import AllTweets from './components/AllTweets';
import NewTweets from './components/NewTweets';
import OneTweet from './components/OneTweet';
import EditTweets from './components/EditTweets';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faDove, faPlus, faHouse, faTrash, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faPenToSquare,faDove, faPlus, faHouse, faTrash, faRightFromBracket);


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
          <Route element={<LogReg />} path="/" />
            <Route element={<AllTweets />} path="/home" />
            <Route element={<NewTweets />} path="/new" />
            <Route element={<OneTweet />} path="/tweet/:id" />
            <Route element={<EditTweets />} path="/tweet/edit/:id" />
            <Route element={<Profile />} path="/user/profile/:username" />
          </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
