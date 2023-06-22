import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landingPage';
import BankForm from './components/bankForm';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<BankForm />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
