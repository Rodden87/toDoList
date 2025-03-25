import Auth from "./components/Auth";

function LoginPage({ setUserAuthenticated }) {
    return (
        <div className="container">
            <Auth setUserAuthenticated={setUserAuthenticated} />
        </div>
    );
}

export default LoginPage;