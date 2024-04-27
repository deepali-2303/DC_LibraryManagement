import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import {AdminLoginPage} from './pages/AdminLoginPage';
import { AdminHomePage } from './pages/AdminHomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loginAdmin' element={<AdminLoginPage/>}/>
        <Route path='/adminHome' element={<AdminHomePage/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
