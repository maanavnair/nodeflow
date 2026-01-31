"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                {
                    username: email,
                    password,
                }
            );
            localStorage.setItem("token", res.data.token);
            router.push("/dashboard");
            toast.success("Logged In")
        }
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Login failed");
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />

            <div className="flex justify-center px-6 py-16">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* LEFT: MESSAGE */}
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                            Welcome back to Nodeflow
                        </h1>

                        <p className="text-gray-600 text-lg mb-8">
                            Log in to manage your workflows, triggers, and automations.
                        </p>

                        <div className="space-y-4">
                            <CheckFeature label="Create & manage Workflows easily" />
                            <CheckFeature label="Reliable webhooks & triggers" />
                            <CheckFeature label="Built for developers & teams" />
                        </div>
                    </div>

                    {/* RIGHT: LOGIN CARD */}
                    <div className="bg-white rounded-xl shadow p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Log in to your account
                        </h2>

                        <div className="space-y-4">
                            <Input
                                label="Email"
                                type="text"
                                placeholder="you@company.com"
                                onChange={e => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-6">
                            <PrimaryButton
                                size="big"
                                onClick={handleSubmit}
                            >
                                Log in
                            </PrimaryButton>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => router.push("/signup")}
                                className="text-black font-medium cursor-pointer hover:underline"
                            >
                                Sign up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
