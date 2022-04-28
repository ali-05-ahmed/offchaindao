import React, { useState, useEffect } from "react";
// import styles from "../style.css"
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
// import { Link } from "react-router-dom";
import styles from "../../style.module.css";
import Web3Modal from "web3modal";
import { connectWallet } from "../../../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../../../utils/connectors";
import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";

function PuraNavbar(props) {
    const {
      connector,
      library,
      account,
      chainId,
      activate,
      deactivate,
      active,
      errorWeb3Modal,
      active: networkActive,
      error: networkError,
      activate: activateNetwork,
    } = useWeb3React();
  
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      injectedConnector
        .isAuthorized()
        .then((isAuthorized) => {
          setLoaded(true);
          if (isAuthorized && !networkActive && !networkError) {
            activateNetwork(injectedConnector);
          }
        })
        .catch(() => {
          setLoaded(true);
        });
    }, [activateNetwork, networkActive, networkError]);
  
    
  
    return (
      <div /* className={styles.navbar_main_div} */>
  
        <div className={styles.custom_header}>
          {networkError ? (
            <div className="text-center">
              <span className={styles.network_err}>
                {networkError.toString()}
              </span>
            </div>
          ) : null}
          <Navbar
            expand="lg"
            className="navbar-fixed-top"
            style={{
              backgroundColor: "#211f24",
              // borderBottom: "4px solid #445382",
            }}
          >
            <Container>
              {/* <HashLink to="/#"> */}
                <img
                  className={styles.logo}
                  src=""
                  height={80}
                />
              {/* </HashLink> */}
              <Navbar.Toggle aria-controls="navbarScroll" style={{backgroundColor:"white"}} />
              <Navbar.Collapse id="navbarScroll"  >
                <Nav
                  className="me-auto my-2 my-lg-0"
                  navbarScroll
                  id={styles.nav}
                >
                  {/* <HashLink to="/#my-cool-section" className={styles.hash_link}> */}
                  <Link to="/" style={{textDecoration:"none"}}>
                    <p className={styles.navLink}>Proposals</p>
                  </Link>
                  {/* </HashLink> */}
                  {/* <HashLink to="/#rarity" className={styles.hash_link}> */}
                  <Link to="/new_proposal" style={{textDecoration:"none"}}>
                    <p className={styles.navLink}>New Proposals</p>
                  </Link>
                  {/* </HashLink> */}
                  
                </Nav>
                
                {networkError ? (
                  <button type="button" className="btn-custom secondary-btn">
                    Connect <br/> Wallet
                  </button>
                ) : active ? (
                  <div>
                    <button className={styles.explore_btn}>Connected</button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        connectWallet(activate);
                      }}
                      type="button"
                      className={styles.explore_btn}
                    >
                      Connect Wallet
                    </button>
                  </div>
                  
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
  
  
  
  
  
  
  
  
        
      </div>
    );
  }
  export default PuraNavbar;