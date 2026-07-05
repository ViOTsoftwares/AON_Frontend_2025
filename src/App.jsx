import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import React from "react";
import { HelperRouter } from "./HelperRouter";
import "./App.css";
const Layout = React.lazy(() => import("./Layout"));
const Products = React.lazy(() => import("./pages/Products"));
const Home = React.lazy(() => import("./pages/Home"));
const Catalog = React.lazy(() => import("./pages/Catalog"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const ProdutDetails = React.lazy(() => import("./pages/ProdutDetails"));
const Customization = React.lazy(() => import("./pages/Customization"));
const Cart = React.lazy(() => import("./pages/Cart"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const SearchProducts = React.lazy(() => import("./pages/SearchProducts"));
const ProductCategory = React.lazy(() => import("./pages/ProductCategory"));
const CheckOut = React.lazy(() => import("./pages/CheckOut"));
const Account = React.lazy(() => import("./pages/Account"));
const PrivacyPolicy = React.lazy(
  () => import("./pages/PolicyPage/PrivacyPolicy"),
);
const ShippingPolicy = React.lazy(
  () => import("./pages/PolicyPage/ShippingPolicy"),
);
const RefundPolicy = React.lazy(
  () => import("./pages/PolicyPage/RefundPolicy"),
);
const Terms_Condition = React.lazy(
  () => import("./pages/PolicyPage/Terms_Condition"),
);

function App() {
  console.log("api0---", import.meta.env.VITE_API);
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:key" element={<BlogDetails />} />
            <Route path="search" element={<SearchProducts />} />
            <Route path="category" element={<ProductCategory />} />
            <Route
              path="checkout"
              element={
                <HelperRouter type="Auth">
                  <CheckOut />
                </HelperRouter>
              }
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="terms-condition" element={<Terms_Condition />} />

            <Route path="about-us" element={<AboutUs />} />
            <Route path="detail/:id" element={<ProdutDetails />} />
            <Route
              path="account"
              element={
                <HelperRouter type="Auth">
                  <Account />
                </HelperRouter>
              }
            />
            <Route path="cart" element={<Cart />} />
            <Route path="customization" element={<Customization />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
