import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };


  return (
    <div className="App">
      <NavBar userName={userName}/>
      {isLoggedIn ? (  <HomePage userName={userName}/> ) : (  <Login onLogin={handleLogin} />  )}
    </div>
  );
}

export default App;
