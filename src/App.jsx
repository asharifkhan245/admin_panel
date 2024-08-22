import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
// import Signup from './pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import ManageProducts from './pages/ManageProducts';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={loggedIn && <Login setLoggedIn={setLoggedIn} />} /> */}
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/manageusers' element={<ManageUsers /> } />
          <Route  path='/manageproducts' element={<ManageProducts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
