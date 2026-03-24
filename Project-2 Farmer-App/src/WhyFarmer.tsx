import whyImg from "./assets/about-img.jpg";

export default function Why() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex items-center gap-20">
                <div className="w-[50%]">
                    <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">
                        • WHY KISANSEVA
                    </p>

                    <h2 className="text-5xl font-semibold leading-tight">
                        Because Every Farmer Deserves the Best Land
                    </h2>

                    <p className="mt-6 text-gray-500 max-w-md">
                        KisanSeva is your trusted partner in finding fertile farmland crafted
                        for lasting productivity and sustainable farming.
                    </p>

                    <div className="mt-8 space-y-5">
                        {[
                            "Verified Farmlands",
                            "Agricultural Expertise",
                            "Personalized Guidance",
                            "Commitment to Farmers"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="bg-orange-200 w-10 h-10 flex items-center justify-center rounded-lg">
                                    ✓
                                </div>
                                <span className="text-gray-800 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="mt-10 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
                        Talk to an Expert
                    </button>
                </div>
                <div className="w-[50%]">
                    <img src={whyImg} alt="Why KisanSeva" className="rounded-2xl w-full" />
                </div>
            </div>
        </div>
    );
}
