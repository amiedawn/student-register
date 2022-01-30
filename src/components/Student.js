import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Student() {
  const baseURL = "http://localhost:9090";
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch(`${baseURL}/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  useEffect(() => {
    fetch(`${baseURL}/student/getAll`)
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <h1 style={{ color: "orange" }}>Add Student</h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Register Student
          </Button>
        </form>
      </Paper>
      <h1 style={{ color: "orange" }}>Students</h1>

      <Paper elevation={10} style={paperStyle}>
        <Paper
          elevation={6}
          style={{ margin: "10px", padding: "15px", textAlign: "left" }}
        >
          <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Paper>
      </Paper>
    </Container>
  );
}
