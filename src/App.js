import './App.css';
import Home from './components/Home';
import TabsComp from "./Tabs";
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import SinglePage from './components/SinglePage';
import Checkout from './components/Checkout';
import { useState } from 'react';
import SearchDetails from './components/SearchDetails';
import SearchPageFooter from './components/SearchPageFooter';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerUser';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookedSlots from './components/bookedSlots';

axios.defaults.baseURL = 'https://capstone-airbnb-server.onrender.com/api/v1';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<>  <Home toggle={open} setToggle={setOpen} /> </>} >
              <Route path='/' element={ <> <TabsComp toggle={open} setToggle={setOpen} />  <SearchPageFooter /></> } />
              <Route path='/booked-slots' element={<> <BookedSlots /> <SearchPageFooter /> </>} />
              <Route path="/:id" element={<SinglePage />} />
              <Route path="/checkout/:id/:days" element={<Checkout />} />
              <Route path="/location/:loc" element={<SearchDetails />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/user" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;







