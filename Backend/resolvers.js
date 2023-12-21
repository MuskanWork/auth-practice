const { users } = require("./config");
const jwt = require('jsonwebtoken');

const secretKey = 'Muskan-key'; 
const tokenExpiration = '10m'; 

const resolvers = {
  Query: {
    hello: () => "Hello, Checking!",
  },

  Query: {
    users: () => users,
  },

  Mutation: {
    registerUser: (_, { email, password, confirmPassword }) => {
      console.log("Resolver: email----", email, password, confirmPassword);
      // Check if the email is unique
      if (users.some((user) => user.email === email)) {
        throw new Error("Email already registered");
      }

      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Create a new user
      const newUser = {
        id: users.length + 4,
        email,
        password,
      };

      // Store the user
      users.push(newUser);
      console.log("newuser", newUser);

      return newUser;
    },
  },

  Mutation: {
    loginUser: (_, { email, password }) => {
      console.log("email---", email, password);
      const user = users.find((user) => user.email === email);

      if (!user || user.password != password) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
        expiresIn: tokenExpiration,
      });

      return { message: "User Login succesfully", token };
    },
  },
};

module.exports = resolvers;