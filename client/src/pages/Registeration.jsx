import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please enter all required fields.");
      return;
    }

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        alert("Registration successful. Now you can log in.");
        // Redirect to login page or handle accordingly
      } else {
        setError("Registration failed. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Registration failed. Please try again later.");
      }
      console.error(error.message);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
