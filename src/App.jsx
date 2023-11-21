import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/register/Register";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getAdmin } from "./redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import Produto from "./components/produto/Produto";
const Home = () => {
  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
};
function App() {
  const { isLoggedIn, isSuccess, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    const token = sessionStorage.getItem('token')
    if(token){
    dispatch(getAdmin(token));
  }

  }, []);
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Home />} />
            <Route path="/cadastrar-usuario" element={<Register />} />
            <Route path="/produtos" element={<Produto />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
