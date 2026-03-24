import step1 from "./assets/house1.webp";
import step2 from "./assets/step2.webp";
import step3 from "./assets/step3.webp";

export default function HowItWorks() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
            <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">
                • HOW IT WORKS
            </p>

            <h2 className="text-5xl font-semibold leading-tight">
                A Simple Path to Your Dream Farm
            </h2>

            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                KisanSeva makes finding and securing your farmland simple, transparent, and effortless — every step guided with care and agricultural expertise.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                    {
                        step: "STEP 1",
                        title: "Explore Our Farms",
                        desc: "Discover our curated listings of fertile farmlands, each verified for soil quality and water availability.",
                        img: step1,
                    },
                    {
                        step: "STEP 2",
                        title: "Schedule a Farm Visit",
                        desc: "Visit your preferred farmland and assess the soil, crops, and infrastructure with our agricultural experts.",
                        img: step2,
                    },
                    {
                        step: "STEP 3",
                        title: "Finalize with Confidence",
                        desc: "Complete your purchase with full legal support and start your farming journey with peace of mind.",
                        img: step3,
                    },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="bg-orange-200 text-sm px-4 py-1 rounded-full inline-block mb-6">
                            {item.step}
                        </div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-500 text-sm mt-3">{item.desc}</p>
                        <img src={item.img} className="mt-6 rounded-xl w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
