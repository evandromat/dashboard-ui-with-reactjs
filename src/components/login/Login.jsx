import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jpIMG from "./assets/jp.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { validateEmail } from "../../utils";
import {
  RESET_AUTH,
  getAdmin,
  login,
} from "../../redux/features/auth/authSlice";
const initialState = {
  name: "",
  password: "",
};
function Login() {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const { isLoggedInAuth, isSuccessAuth, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChanger = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const loginForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Todos os campos são obrigatórios");
    }
    if (password.length < 6) {
      return toast.error("A senha deve ter o mínimo de 6 caracteres...");
    }
    if (!validateEmail(email)) {
      return toast.error("Digite um email válido...");
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));

    setFormData(initialState);
  };
  useEffect(() => {
    if (isSuccessAuth && isLoggedInAuth) {
      navigate("/admin");
      const token = sessionStorage.getItem("token");
      dispatch(getAdmin(token));
      if (user) {
        navigate("/admin");
      }
      dispatch(RESET_AUTH());
    }
  }, [user, isSuccessAuth, isLoggedInAuth, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, dispatch]);

  return (
    <div className="--container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Bem vindo </span>

            <span className="login-form-title">
              <img src={jpIMG} alt="Jovem Programador" />
            </span>

            <div className="wrap-input">
              <input
                name="email"
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={handleChanger}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                name="password"
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={handleChanger}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button onClick={(e) => loginForm(e)} className="login-form-btn">
                Login
              </button>
            </div>

            <div className="text-center">
              <span className="txt1">Não possui conta? </span>
              <Link className="txt2" to={"/cadastrar-usuario"}>
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
