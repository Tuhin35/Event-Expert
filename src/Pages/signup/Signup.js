import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { AuthContext } from '../../Contexts/AuthProvider';
import { setAuthToken } from '../../Service Operations/Auth';
import { saveUser } from '../../Service Operations/manageusers';
import SmallSpinner from '../../components/Spinners/SmallSpinner';
const Signup = () => {
    const { createUser, updateUserProfile, loading, setLoading, verifyEmail, signInWithGoogle } = useContext(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/"

    // form validation
    const schema = yup.object({
        fullName: yup.string().required(),
        email: yup.string().required(" You have to provide email for sure!").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "❌ Provided email is not valid!"),
        password: yup.string().min(6, "Password must be at least 6 characters ❌").max(18, "Password must be at most 18 characters ❌").matches(/^(?=.*[A-Z])/, "Password should have at least one uppercase letter")
            .matches(/^(?=.*[!@#$%^&*])/, "Password must include at least one special character")
    }).required();


    // form stuff
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });




    const handleSignup = (data) => {
        // console.log(data);
        const { email, password, fullName, } = data;
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
         console.log(image);

       
        const url = `https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_imgbb_key}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.data?.display_url)
                // console.log('load:', loading)
                // create user
                createUser(email, password).then(result => {
                    const user = result.user;
                    console.log(user);
                    toast.success("login success");
                    reset();

                    setAuthToken(user);
                    saveUser({
                        email: user.email,
                        name: fullName,
                        image: data.data?.display_url,

                    })
                    // update profile
                    updateUserProfile(fullName, data.data?.display_url)
                        .then(() => {
                            verifyEmail().then(() => {
                                toast.success("Please check email for verification link");
                                setLoading(false);
                                navigate(from, { replace: true })
                            })

                        })

                })
                    .catch(err => {
                        console.error(err.message)
                        setLoading(false)
                    })

            })
            .catch(err => {
                console.error(err);
                // if error occurs we stp the small spinner
                setLoading(false);
            })
        // console.log(formData);



    }

    const handleGoogleSignin = () => {
        signInWithGoogle().then(result => {
            const user = result.user;
            console.log(result.user)
            setAuthToken(result.user)
            saveUser({
                email: user.email,
                name: user.displayName,
                image: user.photoURL,

            })
            setLoading(false)
            navigate(from, { replace: true })
        })
    }

    return (
        <section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    <div className="relative">
                        <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                            <h3 className="text-4xl font-bold text-white">Join 35k+ web professionals & <br className="hidden xl:block" />build your website</h3>
                            <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 dark:text-snow-white-toned bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Commercial License </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 dark:text-snow-white-toned bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Unlimited Exports </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 dark:text-snow-white-toned bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> 120+ Coded Blocks </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 dark:text-snow-white-toned bg-blue-500 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Design Files Included </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 py-10 bg-white-toned dark:bg-[#2e0b28] dark:bg-opacity-95  sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl dark:text-snow-white-toned">Sign up to Eventhive</h2>
                        <p className="mt-2 text-base text-gray-600 dark:text-snow-white-toned">Already have an account? <Link to="/login" className="font-medium text-blue-600 transition-all duration-200 hover:text-cyan-700 focus:text-cyan-700 hover:underline ">Login</Link></p>

                        <form className="mt-8" onSubmit={handleSubmit(handleSignup)}>
                            <div className="space-y-5">
                                <div>
                                    <label for="" className="text-base font-medium text-gray-900 dark:text-snow-white-toned"> Fast & Last name </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 dark:text-snow-white-toned" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>

                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your full name"
                                            className="authentication-form-spec form-input"
                                            {...register("fullName")}
                                        />
                                    </div>
                                    {errors.fullname && <p className='error-message'>{errors.fullname?.message}</p>}
                                </div>

                                <div>
                                    <label for="" className="text-base font-medium text-gray-900 dark:text-snow-white-toned"> Email address </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 dark:text-snow-white-toned" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>

                                        <input
                                            type="email"
                                            name=""
                                            id=""
                                            placeholder="Enter email to get started"
                                            className="authentication-form-spec form-input"
                                            {...register("email")}
                                        />
                                    </div>
                                    {errors.email && <p className='error-message'>{errors.email?.message}</p>}
                                </div>


                                <div>

                                    <label for="" className="text-base font-medium text-gray-900 dark:text-snow-white-toned"> Choose profile photo</label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input type="file" className="block w-full text-sm text-gray-500 dark:text-snow-white-toned file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white dark:file:text-white hover:file:bg-blue-600"   {...register("image")} />
                                    </div>
                                </div>

                                <div>
                                    <label for="" className="text-base font-medium text-gray-900 dark:text-snow-white-toned"> Password </label>
                                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 dark:text-snow-white-toned" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                />
                                            </svg>
                                        </div>

                                        <input
                                            type="password"
                                            name=""
                                            id=""
                                            placeholder="Enter your password"
                                            className="authentication-form-spec form-input"
                                            {...register("password")}
                                        />
                                    </div>
                                    {errors.password && <p className='error-message'>{errors.password?.message}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md primary-gradient focus:outline-none "
                                    >
                                        {loading ? <SmallSpinner /> : "Sign up"}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                                onClick={handleGoogleSignin}>
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <svg className="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                        ></path>
                                    </svg>
                                </div>
                                Sign up with Google
                            </button>

                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                            >
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <svg className="w-6 h-6 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                    </svg>
                                </div>
                                Sign up with Facebook
                            </button>
                        </div>

                        <p className="mt-5 text-sm text-gray-600">
                            This site is protected by reCAPTCHA and the Google <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">Privacy Policy</a> &
                            <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Signup;