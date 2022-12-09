import './App.css';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home';
import Studios from './pages/studios/Studios';
import Subscrptions from './pages/subscriptions'
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import "./App.css";
import Landing from "./pages/landing";

function App() {
  return (
    <>
  <AuthProvider authType = {'localstorage'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <RequireAuth loginPath='/landing'>
                <Layout />
            </RequireAuth>

            }>
            <Route index element={
              <RequireAuth loginPath='/login'>
                  <Home />
              </RequireAuth>
            } />

            <Route path='studios' element={
              <RequireAuth loginPath='/login'>
                  <Studios />
              </RequireAuth>
            }/>

            <Route path='subscriptions' element={
              <RequireAuth loginPath='/login'>
                  <Subscrptions />
              </RequireAuth>
            } />
            {/* add transactions route with protection to redirect to login as well*/}

          </Route>

            {/* non navbar routes tahat need protection */}
          <Route path='/profile' element={
              <RequireAuth loginPath='/login'>
                  <Profile />
              </RequireAuth>
            } />

          {/* unprotected routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/landing' element={<Landing />} />
          

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
