import React, { useEffect, useState } from "react";
import { personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { primeiroNome } from "../../utils";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../redux/features/auth/authSlice";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const [userAdmin, setUserAdmin] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRouteHome = useMatch("/admin");
  const isRouteProduto = useMatch("/produtos");

  useEffect(() => {
    if (isRouteHome) {
      setActiveLinkIdx(1);
    }
    if (isRouteProduto) {
      setActiveLinkIdx(6);
    }
  }, [isRouteHome, isRouteProduto]);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!user) {
      const userSeccao = sessionStorage.getItem("user");
      const token = sessionStorage.getItem("token");
      dispatch(getAdmin(token))
      if (userSeccao && token) {
        setUserAdmin(JSON.parse(userSeccao));
      } else {
        navigate("/");
      }
    }
  }, [user,dispatch]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={user?user.photo:userAdmin.photo} alt="profile image" />
        </div>
        <span className="info-name">{primeiroNome(user?user.name:userAdmin.name)}</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <Link
                to={navigationLink.link}
                className={`nav-link ${
                  navigationLink.id === activeLinkIdx ? "active" : null
                }`}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
