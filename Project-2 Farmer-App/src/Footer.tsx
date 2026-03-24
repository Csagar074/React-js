export default function Footer() {
    return (
        <div className="bg-black text-white pt-24 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">KisanSeva</h2>
                        <p className="text-gray-400 max-w-sm">
                            KisanSeva offers verified fertile farmlands, guided by a commitment to trust,
                            quality, and personalized support for every farmer.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Pages</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Home</li>
                            <li>Farms</li>
                            <li>About</li>
                            <li>Blog</li>
                            <li>Talk to an Expert</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">CMS Pages</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Farm CMS</li>
                            <li>Blog CMS</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400">info@kisanseva.in</p>
                        <p className="text-gray-400 mt-2">+91 98765 43210</p>
                        <div className="flex gap-3 mt-4">
                            <span className="bg-gray-800 p-2 rounded-md">IG</span>
                            <span className="bg-gray-800 p-2 rounded-md">X</span>
                            <span className="bg-gray-800 p-2 rounded-md">FB</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-16 text-gray-500 text-sm">
                    <p>Powered by: KisanSeva</p>
                    <p>© 2025 KisanSeva. All rights reserved</p>
                </div>
            </div>
        </div>
    );
}
