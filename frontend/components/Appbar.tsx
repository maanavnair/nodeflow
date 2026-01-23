"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <div className="flex items-center justify-between border-b px-8 py-4 bg-white">
            {/* Logo / Title */}
            <div
                className="text-2xl font-extrabold cursor-pointer"
                onClick={() => router.push("/")}
            >
                Nodeflow
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
                {!isLoggedIn ? (
                    <>
                        <LinkButton onClick={() => { }}>
                            Contact Sales
                        </LinkButton>

                        <LinkButton onClick={() => router.push("/login")}>
                            Login
                        </LinkButton>

                        <PrimaryButton onClick={() => router.push("/signup")}>
                            Signup
                        </PrimaryButton>
                    </>
                ) : (
                    <PrimaryButton onClick={handleLogout}>
                        Logout
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
};
