import React, { useEffect, useState } from 'react'
import { useWeb3React } from "@web3-react/core";
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

const Proposal = () => {
    const [proposals, setProposals] = useState()
    const [state, setState] = useState(false)
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

    const castVote = (con , id)=>{

        

        try {
            axios.post(`http://localhost:5000/votes/${id}`, {
                
                    voter: account ,
                    vote_status : con
                
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

   
    useEffect( ()=>{
        async function test (){
            let data = await axios.get('http://localhost:5000/proposals').then((res)=>{
                console.log(res.data)
                setProposals(res.data)
            })

        }
        test()
    },[]);
 
console.log(proposals)
  return (
    <div >
        <Container fluid="md">
            
            

            <Row >
            
                <Col lg={9} style={{margin:" auto"}}>

                <div style={{textAlign:"left", marginTop:"2rem", color:"white"}}>
            <h2>Proposals</h2>
            
            </div>

                {proposals !== undefined && proposals !== null ?  proposals.map((arr, i) => {
                    console.log("arr>>", arr)
                    return(
                        <div>
                             <div style={{color:"white", textAlign:"left", marginTop:"3rem", lineHeight:"2rem", border:"1px solid #3a393d", padding:"20px 20px 20px 20px", borderRadius:"20px"}}>
                <h2>{arr.title}</h2>
                <h3>{arr.description}</h3>
                <p>Context After passing the Temperature Check vote with 7M UNI voting in favor of deploying Uniswap v3 on Gnosis Chain (GC), we are creating...</p>
                <p>Total Votes : {arr.total_votes}</p>
                <p>YES : {(arr.total_passed/arr.total_votes)*100} %</p>
                <p>NO : {((arr.total_votes - arr.total_passed)/arr.total_votes)*100} %</p>

                <div style={{padding:"10px"}}>
                    <button onClick={() => castVote(true,arr.proposal_id)} style={{padding:"0px 25px 0px 25px", borderRadius:"10px", backgroundColor:"#1bc22c", border:"none"}}>Yes</button>
                    <button onClick={() => castVote(false,arr.proposal_id)} style={{marginLeft:"30px", padding:"0px 25px 0px 25px", borderRadius:"10px", backgroundColor:"#bf2a34", border:"none"}}>No</button>
                </div>
            </div>
                        </div>
                    )
                }) : null}
                {/* <div style={{color:"white", textAlign:"left", marginTop:"3rem", lineHeight:"2rem", border:"1px solid #3a393d", padding:"20px 20px 20px 20px", borderRadius:"20px"}}>
                <h4>Uniswap by</h4>
                <h3>[Consensus Check] Should Uniswap v3 be deployed to Gnosis Chain?</h3>
                <p>Context After passing the Temperature Check vote with 7M UNI voting in favor of deploying Uniswap v3 on Gnosis Chain (GC), we are creating...</p>

                <div style={{padding:"10px"}}>
                    <button style={{padding:"0px 25px 0px 25px", borderRadius:"10px", backgroundColor:"#1bc22c", border:"none"}}>Yes</button>
                    <button style={{marginLeft:"30px", padding:"0px 25px 0px 25px", borderRadius:"10px", backgroundColor:"#bf2a34", border:"none"}}>No</button>
                </div>
            </div> */}
                </Col>
            </Row>

        </Container>
    </div>
  )
}

export default Proposal