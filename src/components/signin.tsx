import axios from "axios";
import { useState } from "react";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const handleSignin = async (e: any) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/signin`, {
        headers: {
            username: username,
            password: password
        }
    })    
    .then((response) => {
        localStorage.setItem('TDC', `Bearer ${response.data.token}`)
        //
      })
      .catch((error) => {
          setError(error.response.data.msg)
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-xs bg-gray-950">
        <form
          onSubmit={handleSignin}
          className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl text-white font-bold text-center mb-6">Sign In</h2>

          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="shadow appearance-none bg-transparent border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="shadow appearance-none border bg-transparent rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
          <div className="text-red-600 font-bold mt-4">
            {`*${error}`}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;