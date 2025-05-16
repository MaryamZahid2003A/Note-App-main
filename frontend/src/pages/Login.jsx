import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An error occurred during login. Please try again later.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-100 to-indigo-100">
            <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-700">Login</h2>
                    <p className="text-sm text-gray-500">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition font-medium"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
