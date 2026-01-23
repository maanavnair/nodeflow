export const HowItWorks = () => {
    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-3xl font-bold mb-10">How Nodeflow works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: "Choose a trigger",
                        desc: "Webhook, database event, schedule, or API call",
                    },
                    {
                        title: "Chain actions",
                        desc: "Transform data, call APIs, or run AI steps",
                    },
                    {
                        title: "Deploy instantly",
                        desc: "Every flow runs on scalable infra by default",
                    },
                ].map((step, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
                    >
                        <div className="text-sm font-mono text-gray-400 mb-2">
                            Step {i + 1}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
