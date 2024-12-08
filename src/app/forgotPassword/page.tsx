"use client";
import AuthNav from "@/components/authModule/authNav/authNav";
import WelcomeElevate from "@/components/authModule/welcomeElevate/welcomeElevate";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import AuthProviders from "@/components/authModule/authProviders/authProviders";



export default function ForgotPassword() {

    const router = useRouter();

    const handleFormData = async function (values: { email: string }) {
        await axios.post("https://exam.elevateegy.com/api/v1/auth/forgotPassword", values)
            .catch((err) => {
                formik.setErrors({ email: `${err.response.data.message}` });
            }).then((res) => {
                if (res?.status === 200) {
                    router.push("/verifyCode");
                }
            });

    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
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
                    <h5 className="font-bold text-l">Forgot Your Password?</h5>
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
                        <h6 className="text-[#4461F2] text-xs my-2 justify-self-end cursor-pointer">
                            <Link href="/setPassword">Recover Password?</Link>
                        </h6>
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
    )
}