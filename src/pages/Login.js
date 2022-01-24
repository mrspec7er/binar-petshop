import { useState } from "react";
import { signInWithGoogle, auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth,
            email,
            password
        ).then(res => {
            console.log(res);
            navigate("/")
        }).catch(err => {
            console.log(err);
        })
    }

    const handleLoginGoogle = () => {
        signInWithGoogle();
        navigate("/");
    }

    return ( 
        <div className="grid justify-center h-[100vh] bg-orange-50">
            <div className="h-fit w-[70vw] md:w-[30vw]">
            <h1 className="text-center my-12 font-bold text-2xl">Login</h1>
                <form onSubmit={handleSubmit} className="grid gap-14">
                    <input onChange={(e) => setEmail(e.target.value)} className="border-2 h-12 rounded-md" type="email" placeholder="Email..." />
                    <input onChange={(e) => setPassword(e.target.value)} className="border-2 h-12 rounded-md" type="password" placeholder="Password..." />
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-slate-200 py-2 font-bold w-32 rounded-md">Submit</button>
                    </div>
                </form>
                <p className="text-center mt-12 text-blue-400 hover:text-blue-900">
                    <a href="/register">doesn,t have any account ? Register</a>
                </p>
                <div className="flex justify-center">
                    <button onClick={handleLoginGoogle} className="btn bg-blue-300 font-bold py-3 px-2 my-32 md:my-10 rounded-md">Sign In With Google</button>
                </div>
            </div>
        </div>
     );
}
 
export default Login;