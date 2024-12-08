import Link from "next/link";



export default function AuthNav() {
    return (
        <div>
            <ul className="flex justify-end items-center">
                <li className="text-xs fw-3">
                    <select name="language" id="lang" title="language">
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                    </select>
                </li>
                <li className="text-[#4461F2] px-3 text-xs fw-3 cursor-pointer">
                    <Link href="/login">Sign in</Link>
                </li>
                <li className="text-[#4461F2] border-2 rounded-lg cursor-pointer">
                    <div className="px-3 py-1 text-xs fw-3">
                        <Link href="/register">Register</Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}