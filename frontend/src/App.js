import './App.css';
import {Header } from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Tickets} from "./components/Tickets/Tickets";
import {Orders } from "./components/Orders/Orders";
import {Payment} from "./components/Payment/Payment";
import {LogIn } from "./components/LogIn/LogIn";
import {Registration } from "./components/Registration/Registration";
import {Main} from "./components/Main/Main";
import { UserProvider } from './components/UserContext';

export const host = "http://localhost:3001";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/passenger" element={<Orders />} />
            <Route path="/flight" element={<Tickets />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/order" element={<Payment />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;