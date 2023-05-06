import {Link, NavLink, Form, Navigate, useNavigate} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useCookies} from "react-cookie";
//import classes from "./MainNavigation.css";

function MainNavigation () {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth/login");
    }
    return (
      <>
        <nav className={classes.navbar}>
          <h1>
            <div className="company-logo">
              <Link to="/" end>
                Company Name
              </Link>
            </div>
          </h1>

          <div className={classes.list}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
            {!cookies.access_token ? (
              <>
                <Link to="/auth/login" className={classes.login}>
                  Login
                </Link>
                <Link to="/auth/register" className={classes.register}>
                  Register
                </Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </div>
        </nav>
      </>
    );
}

export default MainNavigation;