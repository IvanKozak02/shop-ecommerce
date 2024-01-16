import googleIcon from "../../assets/images/googleIcon.png";

interface googleSignInUpProps{
    title: string
}

function GoogleSignInUp({title}:googleSignInUpProps) {
    return (
        <div className="google-sign-in">
            <p>Or {title} Using</p>
            <div className="login-with-google-btn">
                <button>
                    <img src={googleIcon} alt=""/>
                    {title} with Google
                </button>
            </div>
        </div>
    );
}

export default GoogleSignInUp;