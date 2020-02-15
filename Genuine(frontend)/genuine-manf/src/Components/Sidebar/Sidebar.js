import React, { useContext } from "react";
import styles from "./Sidebar.module.scss";
import Aux from "./../../hocs/Aux";
import AuthContext from "./../../context/authContext";
import Image from "./../../Images/Saluja-Gold/Saluja-Gold.jpg";
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
            <Link style = {{"textDecoration":"none"}} to={`/manf/${auth.manfId}`}>
                <li>Profile</li>
            </Link>            
            <Link style = {{"textDecoration":"none"}} to={`/manf/${auth.manfId}/catg`}>
              <li>Products</li>
            </Link>
            <Link style = {{"textDecoration":"none"}} to={`/manf/${auth.manfId}/distr`}>
              <li>Distributors</li>
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
