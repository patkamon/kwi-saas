'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Home,
    BookOpen,
    CreditCard,
    Coins,
} from "lucide-react";
import LoginButton from "./auth/loginLogoutButton";
import { getCurrentUser } from "./api/get";
import { AuthorInterface } from "@/interface/author";
import Image from 'next/image';

export default function Navbar() {
    const [user, setUser] = useState<AuthorInterface | null>(null);

    // get user_id from session
    useEffect(() => {
        const fetchUserId = async () => {
            const user = await getCurrentUser();
            setUser(user);
        };
        fetchUserId();
    }, []);

    return (
        <nav className="px-6 pb-4 pt-8 flex items-center justify-between font-bold text-blue-700">
            <div className="flex items-center space-x-8">
                <Link href='/' className="flex items-center space-x-2">
                    <Image src='/favicon2.svg' alt="Logo" className="w-12 h-12" width={100} height={100} />
                    <span className="text-2xl font-bold text-pink-600">LoveCraft</span>
                </Link>
                {user && <div className="flex items-center space-x-6 text-sm text-gray-700">
                    <Link href='/' className="flex items-center gap-1 hover:text-black text-blue-700">
                        <Home className="w-4 h-4" />
                        หน้าแรก
                    </Link>

                    <Link href={`/profile/${user?.user_id}`} className="flex items-center gap-1 hover:text-black text-blue-700">
                        <BookOpen className="w-4 h-4" />
                        นิยายของคุณ
                    </Link>
                    <Link href='/credit' className="flex items-center gap-1 hover:text-black text-blue-700">
                        <CreditCard className="w-4 h-4" />
                        เพิ่มเครดิต
                    </Link>
                </div>
                }
            </div>
            <div className="flex items-center space-x-4">
                <button className="hover:text-gray-700">
                    {
                        user && <p>{user.credit} <Coins className="w-4 h-4 inline" /></p>
                    }
                </button>
                <div className="flex items-center space-x-2">
                    <LoginButton />
                </div>
            </div>
        </nav>
    )
}