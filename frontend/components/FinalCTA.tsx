"use client";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { useRouter } from "next/navigation";

export const FinalCTA = () => {
    const router = useRouter();

    return (
        <section className="bg-white border-t">
            <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Start building in minutes
                </h2>
                <p className="text-gray-600 mb-8">
                    Create your first automation today — free forever.
                </p>

                <PrimaryButton size="big" onClick={() => router.push("/signup")}>
                    Create your first Workflow
                </PrimaryButton>
            </div>
        </section>
    );
};
