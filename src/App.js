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
axios.defaults.baseURL = 'https://capstone-airbnb-server.onrender.com/api/';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<>  <Home toggle={open} setToggle={setOpen} /> <TabsComp toggle={open} setToggle={setOpen} />  <SearchPageFooter /> </>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register/user" element={<RegisterPage />} />
            <Route path="/:id" element={<>  <Home /> <SinglePage /> </>} />
            <Route path="/checkout/:id/:days" exact element={<> <Home />  <Checkout /> </>} />
            <Route path="/location/:loc" exact element={<>  <Home /> <SearchDetails /> </>} />
          </Routes>
        </BrowserRouter>
      </main>



    </div>
  );
}

export default App;







