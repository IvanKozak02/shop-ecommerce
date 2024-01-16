import backgroundImg from '../../assets/images/img.png'
import './styles.css'
import {faEnvelope, faLock, faUser, faUserPen} from '@fortawesome/free-solid-svg-icons'
import GoogleSignInUp from "../../components/auth/GoogleSignInUp";
import {useContext, useState} from "react";
import {useForm, SubmitHandler, FieldValues} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import Input from "../../components/auth/Input";
import axios from 'axios'
import {UserErrors} from '../../../../server/src/errors.ts'
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie'
import {IShopContext, ShopContext} from "../../context/shop-context";

const signUpSchema = z.object({
    name: z.string().nonempty("Name could not be empty!"),
    surname: z.string().nonempty("Surname could not be empty!"),
    email: z.string().email("Email is not valid!"),
    password: z.string().min(8, "Password must have at least 8 characters!!!")
})

const signInSchema = z.object({
    email: z.string().email("Email is not valid!"),
    password: z.string().min(8, "Password must have at least 8 characters!!!")
})


function AuthPage() {
    const [toggleForm, setToggleForm] = useState(true);
    const navigate = useNavigate();
    const [_,setCookies] = useCookies(['access-token']);
    const {setIsAuthenticated} = useContext<IShopContext>(ShopContext);

    const Login = () => {
        const {register, handleSubmit, formState: {errors}} = useForm({
            resolver:
                zodResolver(signInSchema)
        })

        const onSubmit:  SubmitHandler<FieldValues> = async (data,ev) => {
            ev?.preventDefault()
            const {email, password} = data;
            let res;
            try {
                res = await axios.post("http://localhost:3001/user/login", {
                    email,
                    password
                })
            }catch (error:any){
                let errorMessage: string = "";
                switch (error?.response?.data?.type){
                    case UserErrors.NO_USER_FOUND:
                        errorMessage = "User doesn`t exist!"
                        break
                    case UserErrors.WRONG_CREDENTIALS:
                        errorMessage = "Wrong username / password combination!"
                        break
                    default:
                        errorMessage = "Something went wrong!!!"
                }
                alert("Error: " + errorMessage);
                return;
            }
            setCookies('access-token', res?.data.token)
            localStorage.setItem('user-id', JSON.stringify(res?.data.userID))
            setIsAuthenticated(true)
            navigate("/")
        };
        return (
            <>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="login-form-title">Login</h1>
                    <Input errors={errors} icon={faEnvelope} inputType={"email"} inputLabel={"Email"} name={'email'}
                           register={register} placeholderText={"email"}/>
                    <Input errors={errors} icon={faLock} inputType={"password"} inputLabel={"Password"}
                           name={'password'}
                           register={register} placeholderText={"password"}/>
                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>
                    <div className="login-btn">
                        <button type="submit">Login</button>
                    </div>
                    <GoogleSignInUp title=" Sign In"/>
                    <div className="addition-possibility">
                        <span>Or Sign IN if you have an account</span>
                        <a onClick={() => setToggleForm(prevState => !prevState)} href="#">SIGN UP</a>
                    </div>
                </form>
            </>
        )
    }


    const Register = () => {

        const {register, handleSubmit, formState: {errors}} = useForm({
            resolver:
                zodResolver(signUpSchema)
        })

        const onSubmit:  SubmitHandler<FieldValues> = async (data,ev) => {
            ev?.preventDefault()
            const {name, surname, email, password} = data;
            try {
                await axios.post("http://localhost:3001/user/register", {
                    name,
                    surname,
                    email,
                    password
                })
            } catch (err:any) {
                if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
                    alert("ERROR: Username already in use!!!")
                    return;
                } else {
                    alert("ERROR: Server Error!!!")
                    return;
                }
            }
            alert("Registration completed. Now Login.")
            setToggleForm(true)
        }


        return (
            <>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="login-form-title">Register</h1>
                    <div className="user-info">
                        <Input errors={errors} icon={faUser} inputType={"text"} inputLabel={"Name"} name={'name'}
                               register={register} placeholderText={"name"}/>
                        <Input errors={errors} icon={faUserPen} inputType={"text"} inputLabel={"Surname"}
                               name={'surname'} register={register} placeholderText={"surname"}/>
                    </div>
                    <div className="user-auth-data">
                        <Input errors={errors} icon={faEnvelope} inputType={"email"} inputLabel={"Email"} name={'email'}
                               register={register} placeholderText={"email"}/>
                        <Input errors={errors} icon={faLock} inputType={"password"} inputLabel={"Password"}
                               name={'password'} register={register} placeholderText={"password"}/>
                    </div>
                    <div className="login-btn">
                        <button type="submit">Register</button>
                    </div>
                    <GoogleSignInUp title=" Sign Up"/>
                    <div className="addition-possibility">
                        <span>Sign In Using</span>
                        <a onClick={() => setToggleForm(prevState => !prevState)} href="#">SIGN IN</a>
                    </div>
                </form>
            </>
        )
    };

    return (
        <div className="auth" style={{backgroundImage: `url(${backgroundImg})`}}>
            <div className="login">
                {toggleForm? <Login/> : <Register/>}
            </div>
        </div>
    )
}

export default AuthPage;