"use client";

import { BACKEND_URL } from "@/app/config";
import { Appbar } from "@/components/Appbar";
import { Input } from "@/components/Input";
import { ZapCell } from "@/components/ZapCell";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* =======================
   Data hook (unchanged)
======================= */
function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then((x) => setAvailableTriggers(x.data.availableTriggers));

        axios
            .get(`${BACKEND_URL}/api/v1/action/available`)
            .then((x) => setAvailableActions(x.data.availableActions));
    }, []);

    return { availableActions, availableTriggers };
}

/* =======================
   Main Page
======================= */
export default function CreateZap() {
    const router = useRouter();
    const { availableActions, availableTriggers } =
        useAvailableActionsAndTriggers();

    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<
        {
            index: number;
            availableActionId: string;
            availableActionName: string;
            metadata: any;
        }[]
    >([]);

    const [selectedModalIndex, setSelectedModalIndex] =
        useState<null | number>(null);

    return (
        <div className="min-h-screen bg-slate-100">
            <Appbar />

            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Create a Workflow</h1>
                    <p className="text-sm text-slate-500">
                        Choose a trigger and one or more actions
                    </p>
                </div>

                <PrimaryButton
                    onClick={async () => {
                        if (!selectedTrigger?.id) return;

                        await axios.post(
                            `${BACKEND_URL}/api/v1/zap`,
                            {
                                availableTriggerId: selectedTrigger.id,
                                triggerMetadata: {},
                                actions: selectedActions.map((a) => ({
                                    availableActionId: a.availableActionId,
                                    actionMetadata: a.metadata,
                                })),
                            },
                            {
                                headers: {
                                    Authorization: localStorage.getItem("token"),
                                },
                            }
                        );

                        router.push("/dashboard");
                    }}
                >
                    Publish
                </PrimaryButton>
            </div>

            {/* Builder Canvas */}
            <div className="flex justify-center py-12">
                <div className="w-full max-w-xl flex flex-col items-center gap-6">
                    {/* Trigger */}
                    <ZapCell
                        onClick={() => setSelectedModalIndex(1)}
                        name={selectedTrigger?.name ?? "Choose Trigger"}
                        index={1}
                    />

                    <div className="w-px h-6 bg-slate-300" />

                    {/* Actions */}
                    {selectedActions.map((action) => (
                        <div
                            key={action.index}
                            className="flex flex-col items-center gap-2 w-full"
                        >
                            <ZapCell
                                onClick={() => setSelectedModalIndex(action.index)}
                                name={
                                    action.availableActionName
                                        ? action.availableActionName
                                        : "Choose Action"
                                }
                                index={action.index}
                            />
                            <div className="w-px h-6 bg-slate-300" />
                        </div>
                    ))}

                    {/* Add Action */}
                    <PrimaryButton
                        onClick={() => {
                            setSelectedActions((a) => [
                                ...a,
                                {
                                    index: a.length + 2,
                                    availableActionId: "",
                                    availableActionName: "",
                                    metadata: {},
                                },
                            ]);
                        }}
                    >
                        <span className="text-xl">＋</span>
                        Add Action
                    </PrimaryButton>
                </div>
            </div>

            {/* Modal */}
            {selectedModalIndex && (
                <Modal
                    index={selectedModalIndex}
                    availableItems={
                        selectedModalIndex === 1
                            ? availableTriggers
                            : availableActions
                    }
                    onSelect={(props) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }

                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name,
                            });
                        } else {
                            setSelectedActions((a) => {
                                const next = [...a];
                                next[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata,
                                };
                                return next;
                            });
                        }

                        setSelectedModalIndex(null);
                    }}
                />
            )}
        </div>
    );
}

/* =======================
   Modal (UI improved)
======================= */
function Modal({
    index,
    onSelect,
    availableItems,
}: {
    index: number;
    onSelect: (
        props: null | { name: string; id: string; metadata: any }
    ) => void;
    availableItems: { id: string; name: string; image: string }[];
}) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();

    const isTrigger = index === 1;

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Select {isTrigger ? "Trigger" : "Action"}
                        </h2>
                        {!isTrigger && (
                            <p className="text-sm text-slate-500">
                                Step {step + 1} of 2
                            </p>
                        )}
                    </div>

                    <button
                        onClick={() => onSelect(null)}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {step === 1 && selectedAction?.id === "email" && (
                        <EmailSelector
                            setMetadata={(metadata) =>
                                onSelect({ ...selectedAction, metadata })
                            }
                        />
                    )}

                    {step === 0 && (
                        <div className="space-y-2">
                            {availableItems.map(({ id, name, image }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        if (isTrigger) {
                                            onSelect({ id, name, metadata: {} });
                                        } else {
                                            setSelectedAction({ id, name });
                                            setStep(1);
                                        }
                                    }}
                                    className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer
                             hover:bg-slate-50 hover:border-slate-300 transition"
                                >
                                    <img
                                        src={image}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="font-medium">{name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* =======================
   Email Selector (UI only)
======================= */
function EmailSelector({
    setMetadata,
}: {
    setMetadata: (params: any) => void;
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-4">
            <Input
                label="To"
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                label="Body"
                placeholder="Email content..."
                onChange={(e) => setBody(e.target.value)}
            />

            <div className="flex justify-end pt-2">
                <PrimaryButton
                    onClick={() => {
                        setMetadata({ email, body });
                    }}
                >
                    Save Action
                </PrimaryButton>
            </div>
        </div>
    );
}
