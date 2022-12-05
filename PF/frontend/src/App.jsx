import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './pages/layout'
import Home from './pages/home';
import Studios from './pages/studios'
import Subscrptions from './pages/subscriptions'
import Landing from './pages/landing'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='studios' element={<Studios />} />
          <Route path='subscriptions' element={<Subscrptions />} />
          <Route path='landing' element={<Landing />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
    );
}

export default App;
