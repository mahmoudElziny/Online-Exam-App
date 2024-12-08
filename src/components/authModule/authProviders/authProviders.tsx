import { signIn } from "next-auth/react";
import Image from "next/image";
import github from "../../../public/assets/images/github-mark.png";
import facebook from "../../../public/assets/images/facebook.png";
import google from "../../../public/assets/images/google.png";
import apple from "../../../public/assets/images/apple-logo.png";







export default function AuthProviders() {

    const handleIdentityGoogle = async () => {
        signIn("google", { callbackUrl: "/" });
    }
    const handleIdentityGithub = async () => {
        signIn("github", { callbackUrl: "/" });
    }

    return (
        <>
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
                                    <Image
                                        onClick={handleIdentityGoogle}
                                        src={google}
                                        alt="google"
                                    ></Image>
                                </div>
                            </div>
        </>
    );
}