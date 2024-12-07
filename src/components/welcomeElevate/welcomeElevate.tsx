import Image from "next/image";
import elevateImage from "../../public/assets/images/welcomeToElevate.png";



export default function WelcomeElevate() {
    return (
        <div className="w-1/2 bg-[#F0F4FC] p-14 rounded-e-[50px] shadow-[15px_5px_20px_0_rgba(0,0,0,0.1)]">
                    <div>
                        <h1 className="text-3xl font-semibold">Welcome to</h1>
                        <h1 className="text-3xl text-[#122D9C] font-bold">Elevate</h1>
                        <p className="my-5">
                            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
                        </p>
                    </div>
                    <Image src={elevateImage} alt="Welcome to Elevate" />
                </div>
    );
}