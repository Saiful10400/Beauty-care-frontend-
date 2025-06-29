import {
    Mail,
    Phone,
    Facebook,
    Youtube,
    Twitter,
    Instagram,
    Linkedin,
} from 'lucide-react';

export default function TopContactSection() {
    return (
        <div className="bg-[#1E1E38] text-white text-sm py-2 px-4">
            <div className="w-full mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                {/* Left Section */}
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 text-red-400">
                        <Mail size={14} />
                        <span className="text-white hidden sm:inline">Email:</span>
                        <a
                            href="mailto:support@banglashoppers.com"
                            className="hover:underline text-white"
                        >
                            support@banglashoppers.com
                        </a>
                    </div>
                    <div className="flex items-center gap-1 text-red-400">
                        <Phone size={14} />
                        <span className="text-white hidden sm:inline">Hotline:</span>
                        <span>01879 222 444</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 text-xs sm:text-sm">
                    <a href="#" className="hover:underline text-white">
                        Contact Us
                    </a>
                    <Facebook size={16} className="hover:text-blue-500 cursor-pointer" />
                    <Youtube size={16} className="hover:text-red-500 cursor-pointer" />
                    <Twitter size={16} className="hover:text-sky-400 cursor-pointer" />
                    <Instagram size={16} className="hover:text-pink-500 cursor-pointer" />
                    <Linkedin size={16} className="hover:text-blue-600 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
