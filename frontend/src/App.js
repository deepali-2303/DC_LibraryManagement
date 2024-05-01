import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import {AdminLoginPage} from './pages/AdminLoginPage';
import { AdminHomePage } from './pages/AdminHomePage';
import { StudentLoginPage } from './pages/StudentLoginPage';
import { StudentHomePage } from './pages/StudentHomePage';
import { HomePage } from './pages/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/loginAdmin' element={<AdminLoginPage/>}/>
        <Route path='/adminHome' element={<AdminHomePage/>}/> 
        <Route path='/loginStudent' element={<StudentLoginPage/>}/>
        <Route path='/studentHome' element={<StudentHomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
