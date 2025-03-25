import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/authService";
//import { logoutUser } from "../services/authService";

const Auth = ({ setUserAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isLogin) {
                response= await loginUser(username, password);
            } else {
                response = await registerUser(username, password);
            }

            if (response && response.token) {
            setUserAuthenticated(true);
            navigate("/");
            } else {
                throw new Error("Error en la autenticación");
            }            
        } catch (error) {
            alert("Error en Autenticación: " + (error.response?.data?.error || "Intentalo de nuevo"));
        }
    };

    /*const handleLogout = () => {
        logoutUser();
        setUserAuthenticated(false);
        window.location.href = "/";
    };*/

    return (
        <div>
            <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit">{isLogin ? "Login" : "Registrarse"}</button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
        </div>
    );
};

export default Auth;