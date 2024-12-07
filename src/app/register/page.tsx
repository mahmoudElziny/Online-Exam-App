"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import github from "../../public/assets/images/github-mark.png";
import facebook from "../../public/assets/images/facebook.png";
import google from "../../public/assets/images/google.png";
import apple from "../../public/assets/images/apple-logo.png";
import eyePassword from "../../public/assets/images/eye-password.png";
import { FormValues } from "@/lib/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthNav from "@/components/authNav/authNav";
import WelcomeElevate from "@/components/welcomeElevate/welcomeElevate";

export default function signup() {

    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const handleFormData = async function (values: FormValues) {
        let user = await axios.post("https://exam.elevateegy.com/api/v1/auth/signup", values)
            .catch((err) => {
                formik.setErrors({ email: `${err.response.data.message}` });
            }).then(async(user) => {
                if (user?.status === 200) {
                    await signIn("credentials", {
                        email: values.email,
                        password: values.password,
                        redirect: false,
                        callbackUrl: "/",
                    });
                    router.push("/");
                }
            })
    }

    let validationSchema = Yup.object({
        username: Yup.string().required('userName is required').min(3, "min character is 3").max(16, "max character is 16"),
        firstName: Yup.string().required('firstName is required').min(3, "min character is 3").max(16, "max character is 16"),
        lastName: Yup.string().required('lastName is required').min(3, "min character is 3").max(16, "max character is 16"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Enter valid Password"
            ),
        rePassword: Yup.string().required("Re Password is required").oneOf([Yup.ref('password')], 'Password does not match'),
        phone: Yup.string().required('Phone is required').matches(/^01[0-2,5]{1}[0-9]{8}$/),
    });

    let formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        onSubmit: handleFormData,
        validationSchema,
    });

    const handleIdentityGoogle = async () => {
        signIn("google", { callbackUrl: "/" });
    }
    const handleIdentityGithub = async () => {
        signIn("github", { callbackUrl: "/" });
    }

    return (
        <>
            <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
                <WelcomeElevate />
                <div className="w-1/2 p-14 flex flex-col	">
                    <AuthNav />
                    <div className="mt-8">
                        <h5 className="font-bold text-l">Sign up</h5>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                id="username"
                                name="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none
                                    ${formik.errors.username && formik.touched.username
                                        ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                        : 'focus:ring-2 focus:ring-blue-500'}`}
                                type="text"
                                placeholder="Enter Username"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.username}</p>
                            )}
                            <input
                                id="firstName"
                                name="firstName"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none
                                    ${formik.errors.firstName && formik.touched.firstName
                                        ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                        : 'focus:ring-2 focus:ring-blue-500'}`}
                                type="text"
                                placeholder="Enter firstName"
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.firstName}</p>
                            )}
                            <input
                                id="lastName"
                                name="lastName"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none
                                    ${formik.errors.lastName && formik.touched.lastName
                                        ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                        : 'focus:ring-2 focus:ring-blue-500'}`}
                                type="text"
                                placeholder="Enter lastName"
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.lastName}</p>
                            )}
                            <input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none
                                    ${formik.errors.email && formik.touched.email
                                        ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                        : 'focus:ring-2 focus:ring-blue-500'}`}
                                type="email"
                                placeholder="Enter Email"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.email}</p>
                            )}
                            <div className="relative w-full">
                                <input
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none 
                                        ${formik.errors.password && formik.touched.password
                                            ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                            : 'focus:ring-2 focus:ring-blue-500'}`}
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder="Enter Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                                >
                                    <Image src={eyePassword} alt="eye" className="w-10  h-10 mt-3 " />
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.password}</p>
                            )}
                            <div className="relative w-full">
                                <input
                                    name="rePassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.rePassword}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none 
                                    ${formik.errors.password && formik.touched.password
                                            ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                            : 'focus:ring-2 focus:ring-blue-500'}`}
                                    type={isVisible ? 'text' : 'password'}

                                    placeholder="Confirm Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                                >
                                    <Image src={eyePassword} alt="eye" className="w-10  h-10 mt-3 " />
                                </button>
                            </div>
                            {formik.touched.rePassword && formik.errors.rePassword && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.rePassword}</p>
                            )}
                            <input
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none
                                    ${formik.errors.phone && formik.touched.phone
                                        ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                        : 'focus:ring-2 focus:ring-blue-500'}`}
                                type="tel"
                                placeholder="Enter Your Phone"
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.phone}</p>
                            )}
                            <button
                                className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-6 shadow-lg"
                                type="submit"
                            >
                                Create Account
                            </button>
                            <p className="or my-5 text-xs text-center text-[#6C737F]">
                                Or Continue with
                            </p>
                            <div id="icons" className="flex justify-center gap-4">
                                <div
                                    onClick={handleIdentityGithub}
                                    className="shadow-md w-6 h-6 flex justify-center items-center rounded-lg cursor-pointer"
                                >
                                    <Image src={github} alt="github"></Image>
                                </div>
                                <div className="shadow-md w-6 h-6 flex justify-center items-center rounded-lg cursor-pointer">
                                    <Image src={facebook} alt="facebook"></Image>
                                </div>
                                <div className="shadow-md w-6 h-6 flex justify-center items-center rounded-lg cursor-pointer">
                                    <Image
                                        onClick={handleIdentityGoogle}
                                        src={google}
                                        alt="google"
                                    ></Image>
                                </div>
                                <div className="shadow-md w-6 h-6 flex justify-center items-center rounded-lg cursor-pointer">
                                    <Image src={apple} alt="apple"></Image>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
