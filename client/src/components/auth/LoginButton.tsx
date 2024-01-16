interface buttonProps{
    title: string
}

function LoginButton({title}:buttonProps) {
    return (
        <div className="login-btn">
            <button type="submit">{title}</button>
        </div>
    );
}

export default LoginButton;