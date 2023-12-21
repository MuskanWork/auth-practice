import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import "../App.css";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      message
      token
    }
  }
`;

const LoginPage = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [userDetails, setUserDetails] = useState({});
  const [validate, setValidate] = useState({});
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = () => {
    console.log(userDetails);
    if (userDetails.email && userDetails.password) {
      loginUser({
        variables: {
          email: userDetails.email,
          password: userDetails.password,
        },
      })
        .then((response) => {
          console.log("User Login successfully:", response.data.loginUser);
          localStorage.setItem("authToken", response.data.loginUser.token);
          setUserDetails({
            email: "",
            password: "",
          });
          alert("Login succesfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("Loggedin failed:", error.message);
        });
    }
  };

  return (
    <div className="App">
      <h1>Login Page:</h1>
      <h3>Enter user email : </h3>
      <input
        type="email"
        onChange={(e) => {
          setUserDetails({ ...userDetails, email: e.target.value });
          setValidate({
            email: emailRegex.test(e.target.value) ? false : true,
          });
        }}
        value={userDetails.email}
        required
      />
      {validate.email && userDetails.email !== "" && (
        <p style={{ color: "red" }}>Enter valid Email</p>
      )}
      <h3>Enter Password : </h3>
      <input
        type={toggleShowPassword ? "text" : "password"}
        onChange={(e) =>
          setUserDetails({ ...userDetails, password: e.target.value })
        }
        value={userDetails.password}
      />
      {userDetails.password && (
        <span onClick={() => setToggleShowPassword(!toggleShowPassword)}>
          {!toggleShowPassword ? "Show" : "Hide"}
        </span>
      )}
      <br />
      <button
        disabled={!userDetails.email || !userDetails.password || validate.email}
        style={{ marginTop: "10px" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
      <br />
      <button onClick={() => navigate("/register")}>Go to Register</button>
    </div>
  );
};

export default LoginPage;
