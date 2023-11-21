import React, { useEffect, useState } from "react";

import jpIMG from "./assets/jp.svg";

import "./styles.css";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  code: "",
};
function Register() {
  const { isLoggedInAuth, isSuccessAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, code } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !code) {
      return toast.error("Todos os campos são obrigatórios");
    }
    if (password.length < 6) {
      return toast.error("A senha deve ter o mínimo de 6 caracteres...");
    }
    if (!validateEmail(email)) {
      return toast.error("Digite um email válido...");
    }

    const userData = {
      name,
      email,
      password,
      code,
    };
    await dispatch(register(userData));
    setFormData(initialState);
  };
  useEffect(() => {
    if (isSuccessAuth && isLoggedInAuth) {
      navigate("/");
      dispatch(RESET_AUTH());
    }
  }, [isSuccessAuth, isLoggedInAuth, dispatch, navigate]);

  return (
    <div className="--container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Cadastro de Usuario </span>

            <span className="login-form-title">
              <img src={jpIMG} alt="Jovem Programador" />
            </span>

            <div className="wrap-input">
              <input
                name="name"
                className={name !== "" ? "has-val input" : "input"}
                type="text"
                value={name}
                onChange={handleInputChange}
              />
              <span className="focus-input" data-placeholder="Nome"></span>
            </div>
            <div className="wrap-input">
              <input
                name="email"
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={handleInputChange}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                name="password"
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={handleInputChange}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>
            <div className="wrap-input">
              <input
                name="code"
                className={code !== "" ? "has-val input" : "input"}
                type="password"
                value={code}
                onChange={handleInputChange}
              />
              <span className="focus-input" data-placeholder="Chave"></span>
            </div>

            <div className="container-login-form-btn">
              <button onClick={registerAdmin} className="login-form-btn">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
