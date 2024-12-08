"use client";
import AuthNav from "@/components/authModule/authNav/authNav";
import WelcomeElevate from "@/components/authModule/welcomeElevate/welcomeElevate";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import AuthProviders from "@/components/authModule/authProviders/authProviders";



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

    const formik = useFormik({
        initialValues: {
            resetCode: "",
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
                        <AuthProviders />
                    </form>
                </div>
            </div>
        </div>
    );
}