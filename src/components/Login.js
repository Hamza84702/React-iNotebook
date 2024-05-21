import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({email:"" , password:""})
  const host = "http://localhost:5000";
  const  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzMGQ3NTA1NTlhMjlhMDc4MTJlMGIxIn0sImlhdCI6MTcxNDU1OTQ1NX0.fZLUEYuvqoCqzCYDXaCXgKVpuPFajVc1SzoVcxm6aRY",
      }, 
      body: JSON.stringify({email:credentials.email, password:credentials.password}), 
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
      //save the token in localstorage and redirect
      localStorage.setItem('token',json.authToken)
      navigate('/');
    }
    else{
      alert("Invalid Credentials")
    }
  }

  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
