import React, { useCallback, useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { login } from "../../external/external-proxy";
import { useHistory } from "react-router-dom";
import "./login-page.css";

export function LoginPage() {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const history = useHistory();

  const setEmpIdCallback = useCallback((event) => {
    setEmpId(event.target.value);
  }, []);

  const setEmpNameCallback = useCallback((event) => {
    setEmpName(event.target.value);
  }, []);

  const handleLogin = useCallback(() => {
    login(empId, empName);
    history.push("/ideas");
  }, [empId, empName, history]);

  return (
    <div className="login-page">
      <Card className="card-container">
        <TextField
          id="empId"
          autoFocus={true}
          placeholder="Enter employee Id"
          onChange={setEmpIdCallback}
          value={empId}
          variant="outlined"
          margin="dense"
        />

        <TextField
          id="empName"
          autoFocus={true}
          placeholder="Enter employee name"
          onChange={setEmpNameCallback}
          value={empName}
          variant="outlined"
          margin="dense"
        />

        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={!(empId && empName)}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
