
import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import ManageProducts from './pages/ManageProducts';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/manageusers' element={<ManageUsers /> } />
          <Route  path='/manageproducts' element={<ManageProducts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
