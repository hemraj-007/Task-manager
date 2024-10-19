'use client'
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();

    return (
        <header className="bg-slate-600 text-white py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1
                    className="text-3xl font-bold cursor-pointer"
                    onClick={() => router.push("/")} // Redirect to home on click
                >
                    Task Manager
                </h1>

            </div>
        </header>
    );
};
