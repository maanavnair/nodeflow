"use client";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { useRouter } from "next/navigation";

export const Hero = () => {
    const router = useRouter();

    return (
        <section className="max-w-6xl mx-auto px-6 py-24">
            <h1 className="text-5xl font-extrabold text-gray-900 max-w-3xl leading-tight">
                Build powerful automations <br /> without writing glue code
            </h1>

            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                Nodeflow lets you connect apps, APIs, and AI into workflows that
                actually run in production.
            </p>

            <div className="mt-10 flex gap-4">
                <PrimaryButton size="big" onClick={() => router.push("/signup")}>
                    Get started free
                </PrimaryButton>

                <SecondaryButton onClick={() => { }} size="big">
                    Contact sales
                </SecondaryButton>
            </div>
        </section>
    );
};
