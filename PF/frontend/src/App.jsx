<<<<<<< HEAD
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Studios from "./pages/studios";
import Subscrptions from "./pages/subscriptions";
import Dropdown from "./components/dropdown";
import Profile from "./pages/profile";
=======
import './App.css';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home';
import Studios from './pages/Studios/Studios'
import Subscrptions from './pages/subscriptions'
import Landing from './pages/landing'
import Login from './pages/login';
import Register from './pages/register';
>>>>>>> e3d4586056c75173a3842e366ef306382967e415

function App() {
  return (
    <>
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="studios" element={<Studios />} />
            <Route path="subscriptions" element={<Subscrptions />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
=======
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='studios' element={<Studios />} />
          <Route path='subscriptions' element={<Subscrptions />} />
          <Route path='landing' element={<Landing />}/>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
>>>>>>> e3d4586056c75173a3842e366ef306382967e415
    </>
  );
}

export default App;
