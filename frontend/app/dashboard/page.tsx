"use client";

import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { LinkButton } from "@/components/buttons/LinkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: {
        id: string;
        zapId: string;
        actionId: string;
        sortingOrder: number;
        type: {
            id: string;
            name: string;
        };
    }[];
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
        };
    };
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/zap`, {
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
            })
            .then((res) => {
                setZaps(res.data.zaps);
                setLoading(false);
            });
    }, []);

    return { loading, zaps };
}

export default function Dashboard() {
    const { loading, zaps } = useZaps();
    const router = useRouter();

    return (
        <div>
            <Appbar />

            {/* THIS is the important container */}
            <div className="max-w-6xl mx-auto px-8 pt-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold">My Zaps</div>
                    <DarkButton onClick={() => router.push("/zap/create")}>
                        Create
                    </DarkButton>
                </div>

                {/* Table header */}
                <div className="flex text-sm mb-2">
                    <div className="flex-1">Name</div>
                    <div className="flex-1">Last Edit</div>
                    <div className="flex-1">Running</div>
                    <div className="flex-1">Go</div>
                </div>

                {/* Rows */}
                {loading && <div>Loading...</div>}

                {!loading &&
                    zaps.map((z) => (
                        <div key={z.id} className="flex py-3 border-t">
                            <div className="flex-1">
                                {z.trigger.type.name}{" "}
                                {z.actions.map((a) => a.type.name).join(" ")}
                            </div>
                            <div className="flex-1">{z.id}</div>
                            <div className="flex-1">Nov 13, 2023</div>
                            <div className="flex-1">
                                <LinkButton onClick={() => router.push(`/zap/${z.id}`)}>
                                    Go
                                </LinkButton>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
