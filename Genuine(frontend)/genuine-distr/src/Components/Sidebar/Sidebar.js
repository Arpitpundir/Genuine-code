import React, { useContext } from "react";
import styles from "./Sidebar.module.scss";
import Aux from "./../../hocs/Aux";
import AuthContext from "./../../context/authContext";
import Image from "./../../Images/flipkartLogo/flipkart1.jpg";
import {Link} from "react-router-dom";

const Sidebar = props => {
  const auth = useContext(AuthContext);
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Sidebar_header}>Dashboard</div>
      <ul>
        {auth.isAuthenticated ? (
          <Aux>
            <li>
              <img src={Image} />
            </li>
            <Link style = {{"textDecoration":"none"}} to={`/distr/${auth.distrId}`}>
                <li>Profile</li>
            </Link>            
            <Link style = {{"textDecoration":"none"}} to={`/distr/${auth.distrId}/requests`}>
              <li>Requests</li>
            </Link>
            <Link style = {{"textDecoration":"none"}} to={`/distr/${auth.distrId}/partners`}>
              <li>Manufacturers</li>
            </Link>
          </Aux>
        ) : (
          <li>Profile</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
