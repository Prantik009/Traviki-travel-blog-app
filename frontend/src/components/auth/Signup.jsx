import { Eye, EyeClosed, Lock, Mail, MapPin, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { signupUser } from "../../store/slices/authSlice"
import { Logo } from "../Logo";

export const Signup = ()=> {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, error} = useSelector((state)=> state.auth)

    const {register, handleSubmit} = useForm()
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (data)=> {
        dispatch(signupUser(data))
        .unwrap()
        .then(()=> navigate("/"))
        .catch((err)=> console.log("Registration Failed: ", err))
    }

    return(
        <div className=" max-w-7xl w-full min-h-screen z-100 fixed flex justify-center items-center">
      <div className=" w-full  h-full flex items-center justify-center ">
        <div className="sign-up md:w-1/2 w-full flex flex-col items-center justify-center gap-4 border-none border-red-500">
          <div className="content flex flex-col items-center justify-center">
            {/* logo icon */}
            <div className="logo">
              <Logo fontSize='4xl'/>
            </div>
            <h1 className="title text-2xl font-bold  capitalize mt-4">
              Create account
            </h1>
            <p className="subtitle text-base">
              Get started with your free account
            </p>
          </div>
          <div className="form-sec w-[90%] md:w-[80%] mt-3">
            <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
              <div className="flex flex-col relative">
                <label htmlFor="fullName" className="font-semibold">Full Name</label>
                <input type="text"  id="fullName" className="border border-gray-700 py-1.5 px-8 rounded-md outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-200" placeholder="John Doe"
                {...register('fullName', { required: 'Full name is required' })}
                />
                <span className="absolute p-1 translate-y-[30.5px] left-1.5">
                    <User2 className="size-4" />
                </span>
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input type="email" autoComplete="off"  id="email" className="border border-gray-700 py-1.5 px-8 rounded-md outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-200" placeholder="example@gmail.com" 
                {...register('email', { required: 'Email is required' })}
                />
                <span className="absolute p-1 translate-y-[30.5px] left-1.5">
                    <Mail className="size-4" />
                </span>
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="password" className="font-semibold">Passwrod</label>
                <input type={showPassword ? 'text' : 'password'}  id="password" className="border border-gray-700 py-1.5 px-8 rounded-md outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-200" placeholder="••••••••" 
                {...register('password', { required: 'Password is required' })}
                />
                <span className="absolute p-1 translate-y-[30.5px] left-1.5">
                    <Lock className="size-4" />
                </span>
                <span className="absolute p-1 translate-y-[30.5px] right-1.5 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}>
                   {showPassword ?  <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                </span>
              </div>

              <button className=" w-full py-2 bg-gradient-to-br from-sky-600 to-green-500 rounded-md mt-2 cursor-pointer text-white hover:scale-102 ease-out transition-all delay-75 outline-none" type="submit" disabled={loading}>Create Account</button>
              {error && <p className="text-red-500 error text-center">{error}</p>}
            </form>
          </div>
          <p>
            Already have an account? <span className=" underline text-gray-500">
                <Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
        {/* <div className="style-element md:w-1/2 hidden sm:flex justify-center">
          <img src="./signup.webp" alt="" className=" size-120 object-cover" />
        </div> */}
      </div>
    </div>
    )
}