import './App.css';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home';
import Studios from './pages/studios'
import Subscrptions from './pages/subscriptions'
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import { AuthProvider, RequireAuth } from 'react-auth-kit'

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
                <Layout />
            }>
            <Route index element={
              <RequireAuth loginPath='login'>
                  <Home />
              </RequireAuth>
            } />

            <Route path='studios' element={<Studios />} />
            <Route path='subscriptions' element={<Subscrptions />} />

          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
    );
}

export default App;
