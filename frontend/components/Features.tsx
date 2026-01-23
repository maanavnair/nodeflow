export const Features = () => {
    return (
        <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-3xl font-bold mb-10">
                Built for developers & teams
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    "Webhook-first architecture",
                    "Visual workflow builder",
                    "AI-powered steps",
                    "Instant deploys",
                    "Production-ready retries",
                    "Simple pricing",
                ].map((feature, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-6 shadow"
                    >
                        <h3 className="font-semibold text-lg">{feature}</h3>
                        <p className="text-gray-600 mt-2">
                            Designed to scale from side projects to production systems.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
