"use client";
import AuthNav from "@/components/authNav/authNav";
import WelcomeElevate from "@/components/welcomeElevate/welcomeElevate";
import { signIn } from "next-auth/react";
import Image from "next/image";
import github from "../../public/assets/images/github-mark.png";
import facebook from "../../public/assets/images/facebook.png";
import google from "../../public/assets/images/google.png";
import apple from "../../public/assets/images/apple-logo.png";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";



export default function VerifyCode() {

    const router = useRouter();

    const handleFormData = async function (values: { resetCode: Number | string}) {
        const res = await axios.post("https://exam.elevateegy.com/api/v1/auth/verifyResetCode", values)
        .catch((err) => {
            formik.setErrors({ resetCode: `${err.response.data.message}` });
        })
        .then((res) => { 
            if (res?.status === 200) { router.push("/setPassword"); }
        });
    };

    const validationSchema = Yup.object({
        resetCode: Yup.number().min(6, "min character is 6").required('resetCode is required'),
    });

    let formik = useFormik({
        initialValues: {
            resetCode: "",
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
                            id="resetCode"
                            name="resetCode"
                            onChange={formik.handleChange}
                            value={formik.values.resetCode}
                            onBlur={formik.handleBlur}
                            className={`w-full bg-[#F9F9F9] rounded-md mt-3 p-2 focus:outline-none
                                    ${formik.errors.resetCode && formik.touched.resetCode
                                    ? 'focus:ring-2 focus:ring-red-500 border-red-500'
                                    : 'focus:ring-2 focus:ring-blue-500'}`}
                            type="text"
                            placeholder="Enter OTB Code"
                        />
                        {formik.touched.resetCode && formik.errors.resetCode && (
                            <p className="text-red-500 text-sm p-1">{formik.errors.resetCode}</p>
                        )}
                        <h6 className=" text-xs my-2 justify-self-end">
                            Didn't receive a code? <button type="submit" className="text-[#4461F2]">Resend</button>
                        </h6>
                        <button
                            className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-6 shadow-lg"
                            type="submit"
                        >
                            Verify
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