import aboutImg from "./assets/about-img.jpg";

export default function About() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex gap-24 items-start">
                <div className="w-[40%]">
                    <p className="text-sm tracking-widest uppercase text-gray-500 mb-12">
                         ABOUT KISANSEVA
                    </p>
                    <img src={aboutImg} alt="Farmers" className="rounded-2xl w-full" />
                </div>
                <div className="w-[60%]">
                    <h2 className="text-3xl font-semibold leading-tight">
                        KisanSeva specializes in connecting farmers with fertile agricultural land —
                        each carefully verified and exclusively available for purchase.
                    </h2>

                    <p className="mt-6 text-gray-500 leading-relaxed max-w-xl">
                        We are dedicated to empowering farmers by providing access to quality farmland,
                        modern tools, and expert guidance. With trust and transparency at our core,
                        KisanSeva ensures a smooth and reliable land-buying experience.
                    </p>

                    <div className="flex gap-24 mt-12">
                        <div>
                            <h3 className="text-3xl font-semibold">500+</h3>
                            <p className="text-gray-500 mt-1 text-sm">Registered Farmers</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-semibold">3000+</h3>
                            <p className="text-gray-500 mt-1 text-sm">Acres of Land Managed</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-semibold">150+</h3>
                            <p className="text-gray-500 mt-1 text-sm">Organic Products</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-semibold">98%</h3>
                            <p className="text-gray-500 mt-1 text-sm">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
