import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import './styles/app.css';
import ProductDetails from './pages/product-details/product-details';
import ProductsCategory from './pages/products-category/products-category';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products/category/:category" element={<ProductsCategory />} />
    </Routes>
  </BrowserRouter>
);

export default App;
