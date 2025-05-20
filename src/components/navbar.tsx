import React from "react";
import Link from "next/link";
import {
    Home,
    BookOpen,
    CreditCard,
    Bell,
    User,
} from "lucide-react";

export default function Navbar() {
    return (
        <nav className="px-6 pb-4 pt-8 flex items-center justify-between font-bold text-blue-700">
            <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-pink-600"/>
                    <span className="text-2xl font-bold text-pink-600">Kwi</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-700">
                    <div className="flex items-center gap-1 hover:text-black text-blue-700">
                        <Home className="w-4 h-4"/>
                        <Link href='/'>Home</Link>
                    </div>
                    <div className="flex items-center gap-1 hover:text-black text-blue-700">
                        <BookOpen className="w-4 h-4"/>
                        <Link href='/profile'>Your Fiction</Link>
                    </div>
                    <div className="flex items-center gap-1 hover:text-black text-blue-700">
                        <CreditCard className="w-4 h-4"/>
                        <Link href='/credit'>Your Credit</Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="hover:text-gray-700">
                    <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-sm font-medium">John Doe</span>
                </div>
            </div>
        </nav>
    )
}