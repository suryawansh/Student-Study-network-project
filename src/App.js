import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Memes from './components/Memes/Memes';
import Notes from './components/Notes/Notes';
import Subject from './components/Subject/Subject';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [pageToShow, setPageToShow] = useState("Home");
  useEffect(()=>{
    const email = localStorage.getItem('email');
    if(email){
      setIsLoggedIn(true);
    }
  },[isLoggedIn])

  const handleLogin = (isLoginIn) => {
    setIsLoggedIn(isLoginIn);
  }

  const getPage = () => {
    console.log("Called")
    switch(pageToShow){
      case "Home":
        return <Memes setPage={setPage} handleLogin={handleLogin} />
      case "Notes":
        return <Notes setPage={setPage} handleLogin={handleLogin}  />   
      case "Subject":
        return <Subject setPage={setPage} handleLogin={handleLogin}  />
    }
    return <Memes />
  }

  const setPage = (page) => {
    setPageToShow(page);
  }
  console.log(pageToShow);
  return (
    <div>
    { isLoggedIn?(          
        getPage()
      ): <Login setIsLoggedIn={handleLogin} /> }
    </div>
  );
}

export default App;
