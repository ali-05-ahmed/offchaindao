import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
import { useWeb3React } from "@web3-react/core";




const NewProposal = () => {

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

    const [title, setTitle] = useState()
    const [msg, setMsg] = useState()

    const addProposal = ()=>{
        try {
            axios.post('http://localhost:5000/proposals', {
                title : title,
                description : msg,
                ipfs:"https://ipfs.io/ipfs/QmV7EppvbVv864gxAC6EYGb7osYPkc8SbTQZubf2R6e7Pg?filename=0.png",
                proposer: account
            })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        } catch (error) {
            
        }
    }

   
    return (
        <div>
            <Container fluid="md">
                <Row >

                    <Col lg={9} style={{ margin: " auto" }}>

                        <div style={{ textAlign: "left", marginTop: "2rem", color: "white" }}>
                            <h2>Propose</h2>
                            <h5>You must hold STZ in order to propese</h5>
                        </div>

                        <div style={{textAlign:"left", color:"white", textAlign:"left", marginTop:"3rem", border:"1px solid #3a393d", padding:"20px 20px 20px 20px"}}>
                        <label for="fname" style={{fontWeight:"500", fontSize:"18px"}}>Title: </label><br/>
                        <input onChange={(e) => setTitle(e.target.value)} style={{marginTop:"1rem", width:"90%", border:"none", padding:"10px 10px 10px 20px", borderRadius:"20px"}} type="text" id="fname" name="fname" /><br /><br />
                        </div>


                        <div style={{textAlign:"left", color:"white", textAlign:"left", marginTop:"1rem", border:"1px solid #3a393d", padding:"20px 20px 20px 20px"}}>
                        <label for="fname" style={{fontWeight:"500", fontSize:"18px"}}>Description: </label><br/>
                        <textarea onChange={(e) => setMsg(e.target.value)} rows="4" cols="50" style={{marginTop:"1rem", width:"90%", border:"none", padding:"10px 10px 10px 20px", borderRadius:"20px"}}  id="fname" name="fname" /><br /><br />
                        </div>

                    </Col>
                </Row>

                <button onClick={addProposal} style={{padding:"10px 30px 10px 30px", backgroundColor:"black" ,borderRadius:"15px", marginTop:"10px", color:"white", border:"none", fontWeight:"500"}}>Submit</button>

            </Container>
        </div>
    )
}

export default NewProposal