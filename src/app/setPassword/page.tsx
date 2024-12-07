"use client";
import AuthNav from "@/components/authNav/authNav";
import WelcomeElevate from "@/components/welcomeElevate/welcomeElevate";
import { signIn } from "next-auth/react";
import Image from "next/image";
import github from "../../public/assets/images/github-mark.png";
import facebook from "../../public/assets/images/facebook.png";
import google from "../../public/assets/images/google.png";
import apple from "../../public/assets/images/apple-logo.png";
import eyePassword from "../../public/assets/images/eye-password.png";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FormValues } from "@/lib/types";
import { useState } from "react";



export default function SetPassword() {


    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);


    const handleFormData = async function (values: { email: string, newPassword: string }) {
        const res = await axios.put("https://exam.elevateegy.com/api/v1/auth/resetPassword", values)
            .catch((err) => {
                formik.setErrors({ email: `${err.response.data.message}` });
            })
            .then((res) => {
                if (res?.status === 200) { router.push("/"); }
            });
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Enter valid Password"
            ),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
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
        <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
            <WelcomeElevate />
            <div className="w-1/2 p-14 flex flex-col	">
                <AuthNav />
                <div className="mt-8">
                    <h5 className="font-bold text-l">Verify code</h5>
                    <form onSubmit={formik.handleSubmit}>
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
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm p-1">{formik.errors.email}</p>
                        )}
                        <div className="relative w-full">
                                <input
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none 
                                    ${formik.errors.newPassword && formik.touched.newPassword
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
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <p className="text-red-500 text-sm p-1">{formik.errors.newPassword}</p>
                            )}

                        <button
                            className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-6 shadow-lg"
                            type="submit"
                        >
                            Sign in
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
    );
}