"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        setHydrated(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    // ⛔ Don't render until client hydration is done
    if (!hydrated) {
        return (
            <div className="h-[64px] border-b bg-white" />
        );
    }

    return (
        <div className="flex items-center justify-between border-b px-8 py-4 bg-white">
            {/* Logo */}
            <div
                className="text-2xl font-extrabold cursor-pointer"
                onClick={() => router.push("/")}
            >
                Nodeflow
            </div>

            {/* Actions */}
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
