"use client"
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    id: string
    triggerId: string
    userId: number
    actions: {
        id: string
        sortingOrder: number
        type: {
            id: string
            name: string
            image: string
        }
    }[]
    trigger: {
        type: {
            id: string
            name: string
            image: string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                Authorization: localStorage.getItem("token") || ""
            }
        }).then(res => {
            setZaps(res.data.zaps);
            setLoading(false);
        });
    }, []);

    return { loading, zaps };
}

export default function Page() {
    const { loading, zaps } = useZaps();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Zaps</h1>
                    <DarkButton onClick={() => router.push("/zap/create")}>
                        + Create Zap
                    </DarkButton>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">
                        Loading zaps…
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...zaps].reverse().map(z => (
                            <ZapCard key={z.id} zap={z} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ZapCard({ zap }: { zap: Zap }) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col gap-4">

            {/* ICON FLOW */}
            <div className="flex items-center gap-2">
                <img
                    src={zap.trigger.type.image}
                    className="w-10 h-10 rounded"
                />
                <span className="text-gray-400 text-xl">→</span>
                {zap.actions.map(a => (
                    <img
                        key={a.id}
                        src={a.type.image}
                        className="w-10 h-10 rounded"
                    />
                ))}
            </div>

            {/* ZAP ID */}
            <div className="text-xs font-mono text-gray-500 break-all">
                {zap.id}
            </div>

            {/* WEBHOOK */}
            <div className="bg-gray-100 rounded p-3 text-xs font-mono text-gray-700 break-all">
                {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}
            </div>

            {/* CTA */}
            <div className="mt-auto flex justify-end">
                <LinkButton onClick={() => router.push(`/zap/${zap.id}`)}>
                    Open Zap →
                </LinkButton>
            </div>
        </div>
    );
}
