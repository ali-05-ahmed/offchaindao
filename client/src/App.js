import { useEffect, useState } from 'react';
import './App.css';
import Web3Modal from "web3modal";
import { connectWallet } from "./utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "./utils/connectors";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from "../src/components/Layout/Navbar/PureNavbar"
import Proposal from "../src/components/Screens/Proposal"
import NewProposal from "../src/components/Screens/NewProposal"


function App() {

  const {
    connector,
    library,
    account,
    chainId,
    activate,
    deactivate,
    active,
    errorWeb3Modal,
    active: networkActive, error: networkError, activate: activateNetwork
  } = useWeb3React();



  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injectedConnector)
        }
      })
      .catch(() => {
      })
  }, [activateNetwork, networkActive, networkError])

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Proposal />} /> 
          <Route path="/new_proposal" element={<NewProposal />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
