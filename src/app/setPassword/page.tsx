"use client";
import AuthNav from "@/components/authModule/authNav/authNav";
import WelcomeElevate from "@/components/authModule/welcomeElevate/welcomeElevate";
import { signIn } from "next-auth/react";
import Image from "next/image";
import eyePassword from "../../public/assets/images/eye-password.png";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";
import AuthProviders from "@/components/authModule/authProviders/authProviders";



export default function SetPassword() {


    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);


    const handleFormData = async function (values: { email: string, newPassword: Number | string }) {
        await axios.put("https://exam.elevateegy.com/api/v1/auth/resetPassword", values)
            .catch((err) => {
                formik.setErrors({ email: `${err.response.data.message}` });
            })
            .then(async () => {
                let user = await signIn("credentials", {
                    email: values.email,
                    password: values.newPassword,
                    redirect: false,
                    callbackUrl: "/",
                });
                if (user?.error) {

                    if (user.status === 401) {
                        formik.setErrors({ newPassword: 'Incorrect email or password' });
                    } else {
                        formik.setErrors({ email: 'An unexpected error occurred. Please try again later.' });
                    }
                }
                else if (user?.ok) {
                    router.push("/");
                }
            });
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        newPassword: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Enter valid Password"
            ),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: handleFormData,
        validationSchema,
    });


    return (
        <div className="mx-auto md:my-10 md:w-1/2 sm:w-full md:flex md:flex-row sm:flex-col shadow-sm border-spacing-5">
            <WelcomeElevate />
            <div className="md:w-1/2 sm:w-full p-14 flex flex-col">
                <AuthNav />
                <div className="mt-8">
                    <h5 className="font-bold text-l">Set a Password</h5>
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
                                name="newPassword"
                                onChange={formik.handleChange}
                                value={formik.values.newPassword}
                                onBlur={formik.handleBlur}
                                className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none 
                                    ${formik.errors.newPassword && formik.touched.newPassword
                                        ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                        : 'focus:ring-2 focus:ring-blue-500'}`}
                                type={isVisible ? 'text' : 'password'}
                                placeholder="Enter New Password"
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
                        <AuthProviders />
                    </form>
                </div>
            </div>
        </div>
    );
}