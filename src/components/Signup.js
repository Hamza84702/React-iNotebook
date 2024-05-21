import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [credentials,setCredentials] = useState({name:"" , email:"" , password:"" , cpassword:""})
  let navigate = useNavigate();
  const  handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({name,email,password})
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            name="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;