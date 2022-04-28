const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a Proposal

app.post("/proposals", async (req, res) => {
  try {
    const { title , ipfs , description } = req.body;
    const newproposal= await pool.query(
      "INSERT INTO proposal (title,ipfs,description,total_votes) VALUES($1,$2,$3,$4) RETURNING *",
      [title,ipfs,description,0]
    );


    res.json(newproposal.rows[0]);
    //console.log(req.body)
  } catch (err) {
    console.error(err.message);
  }
});

//get all proposal

app.get("/proposals", async (req, res) => {
  try {
    const allproposals = await pool.query("SELECT * FROM proposal");
    res.json(allproposals.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a proposal

app.get("/proposals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await pool.query("SELECT * FROM proposal WHERE proposal_id = $1", [
      id
    ]);

    res.json(proposal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a vote

app.post("/votes/:id", async (req, res) => {
    try {
      const { voter } = req.body;
      const { id } = req.params;
      let result
      const vote = await pool.query(
        "SELECT voter FROM votes WHERE proposal_id = $1 AND voter = $2",
        [id,voter]
      );
      result = vote.rows[0]
      if(vote.rowCount==0){
      const newVote= await pool.query(
        "INSERT INTO votes (proposal_id,voter) VALUES($1,$2) RETURNING *",
        [id,voter]
      );
      result = newVote.rows[0]
      }
      res.json(result);
      //console.log(req.body)
    } catch (err) {
      console.error(err.message);
    }
  });

//get a vote

app.get("/hasvoted/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { voter } = req.body;
    const vote = await pool.query(
      "SELECT voter FROM votes WHERE proposal_id = $1 AND voter = $2",
      [id,voter]
    );

    res.json(vote.rowCount);
  } catch (err) {
    console.error(err.message);
  }
});


//get all proposal

app.get("/votes", async (req, res) => {
    try {
      const allvotes = await pool.query("SELECT * FROM votes");
      res.json(allvotes.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//delete a votes DELETE FROM table_name;

app.delete("/deletevotes", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM votes");
    res.json("votes was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/deleteproposals", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM proposal");
      res.json("proposal was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(5000, () => {
  console.log("server has started on port 5000");
});