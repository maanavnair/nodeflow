"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />

            <div className="flex justify-center px-6 py-16">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* LEFT: VALUE PROPOSITION */}
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                            Start automating with Nodeflow
                        </h1>

                        <p className="text-gray-600 text-lg mb-8">
                            Build powerful workflows that connect APIs, apps,
                            and AI — without managing infrastructure.
                        </p>

                        <div className="space-y-4">
                            <CheckFeature label="Easy setup, no boilerplate code" />
                            <CheckFeature label="Free forever for core features" />
                            <CheckFeature label="Production-ready from day one" />
                        </div>
                    </div>

                    {/* RIGHT: SIGNUP CARD */}
                    <div className="bg-white rounded-xl shadow p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            Create your account
                        </h2>

                        <div className="space-y-4">
                            <Input
                                label="Name"
                                type="text"
                                placeholder="Your name"
                                onChange={e => setName(e.target.value)}
                            />

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
                                onClick={async () => {
                                    await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                                        username: email,
                                        password,
                                        name
                                    });
                                    router.push("/login");
                                }}
                            >
                                Get started free
                            </PrimaryButton>
                        </div>

                        <p className="text-xs text-gray-500 mt-4">
                            By signing up, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
