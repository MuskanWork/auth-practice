import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_HELLO_MESSAGE = gql`
  query {
    hello
  }
`;

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      password
    }
  }
`;

const Register = () => {
  const { loading, error, data } = useQuery(GET_HELLO_MESSAGE);
  const [registerUser] = useMutation(REGISTER_USER);
  const [userDetails, setUserDetails] = useState({});
  const [validate, setValidate] = useState({});
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("apply graphql", data.hello);

  const handleSubmit = () => {
    console.log(userDetails);
    if (
      userDetails.email &&
      userDetails.password &&
      userDetails.confirmPassword
    ) {
      registerUser({
        variables: {
          email: userDetails.email,
          password: userDetails.password,
          confirmPassword: userDetails.confirmPassword,
        },
      })
        .then((response) => {
          console.log(
            "User registered successfully:",
            response.data.registerUser
          );
          setUserDetails({
            email: "",
            password: "",
            confirmPassword: "",
          });
          alert(response.data.registerUser?.message);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Registration failed:", error.message);
        });
    }
  };

  return (
    <div>
      <h1>Registeration Form</h1>
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
        // style={{
        //   borderColor:
        //     validate.email && userDetails.email !== "" ? "red" : "intial",
        // }}
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
      <h3>Confirm Password : </h3>
      <input
        type="password"
        onChange={(e) =>
          setUserDetails({ ...userDetails, confirmPassword: e.target.value })
        }
        value={userDetails.confirmPassword}
      />
      {userDetails.confirmPassword &&
        userDetails.password !== userDetails.confirmPassword && (
          <p style={{ color: "red" }}>Password didn't Match</p>
        )}
      <br />
      <button
        disabled={
          !userDetails.email ||
          !userDetails.password ||
          !userDetails.confirmPassword ||
          userDetails.password !== userDetails.confirmPassword ||
          validate.email
        }
        style={{ marginTop: "10px" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
      <br />
      <button onClick={() => navigate("/login")}>Go to Login Page</button>
    </div>
  );
};

export default Register;
