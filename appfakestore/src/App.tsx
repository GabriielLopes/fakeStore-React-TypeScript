import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import './styles/app.css';
import ProductDetails from './pages/home/product-details';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
