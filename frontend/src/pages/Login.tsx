import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, isPending, error, success] = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await login(email, password);
        if (success) {
            navigate("/")
        }
    }

    return (
        <div className="create lg:mx-80 md:mx-40 sm:mx-20 mx-10 my-4">
            <h2 className="text-3xl font-semibold mb-4">Login to your account</h2>
            {error && <div className="my-2 w-full bg-purple-200 rounded-md px-2 py-1 text-purple-900 border border-purple-900 ">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col my-8">
                <label htmlFor="email">Email ID: </label>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type="email" id="email" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} required type="password" id="endTime" className="border border-black hover:border-purple-500 focus:border-purple-500 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-500 focus:ring-1 rounded-md text-black " />
                {!isPending && <button className=" text-purple-800 transition-all w-full border border-purple-400 hover:bg-purple-400 hover:text-white py-3 rounded-md mt-6">Sign In</button>}
                {isPending && <button disabled className="transition-all w-full border border-purple-400 bg-purple-400 cursor-not-allowed text-white py-3 rounded-md mt-6">Logging in...</button>}
            </form>
        </div>
    );
}

export default Login;