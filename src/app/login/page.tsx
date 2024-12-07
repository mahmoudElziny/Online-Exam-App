"use client";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import github from "../../public/assets/images/github-mark.png";
import facebook from "../../public/assets/images/facebook.png";
import google from "../../public/assets/images/google.png";
import apple from "../../public/assets/images/apple-logo.png";
import eyePassword from "../../public/assets/images/eye-password.png";
import { FormValues } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthNav from "@/components/authNav/authNav";
import WelcomeElevate from "@/components/welcomeElevate/welcomeElevate";

export default function Login() {


    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

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

    const handleFormData = async function (values: FormValues) {
        let user = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/",
        });

        if (user?.error) {

            if (user.status === 401) {
                formik.setErrors({ password: 'Incorrect email or password' });
            } else {
                formik.setErrors({ email: 'An unexpected error occurred. Please try again later.' });
            }
        }
        else if (user?.ok) {
            if (rememberMe) {
                localStorage.setItem("userData", JSON.stringify(values));
            }
            router.push("/");
        }
    };

    useEffect(() => {
        const savedUserData = localStorage.getItem("userData");
        let parsedData;
        if (savedUserData) {
            parsedData = JSON.parse(savedUserData);
            formik.values.email= parsedData.email;
            formik.values.password = parsedData.password;
            setRememberMe(true);
        }
    }, []);

    let formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            password: "",
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
                <div className="w-1/2 p-14 flex flex-col">
                    <AuthNav />
                    <div className="mt-8">
                        <h5 className="font-bold text-l">Sign in</h5>
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

                            <h6 className="text-[#4461F2] text-xs my-2 justify-self-end cursor-pointer">
                                <Link href="/forgotPassword">Forgot Password?</Link>
                            </h6>
                            <div>
                                <div className="text-primary text-right text-sm">
                                    <div className="flex items-center justify-end space-x-2">
                                        <label
                                            htmlFor="remember_me"
                                            className="text-sm"
                                        >
                                            Remember Me
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="remember_me"
                                            name="remember_me"
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked? true : false)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-3 shadow-lg"
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
        </>
    );
}
