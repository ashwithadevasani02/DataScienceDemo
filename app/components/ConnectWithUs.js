'use client'
import Image from "next/image";
export default function ConnectWithUs() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8"> 
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
          GET IN TOUCH
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Contact Us
        </h2>
        <p className="text-gray-600">
          Connect with us on social media
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2">
        <a
            href="https://www.instagram.com/datascienceclubjntuh?utm_source=ig_web_button_share_sheet&igsh=cm1yNzFiaGhianIx"
            className="p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-200"
            target="_blank" rel="noopener noreferrer"
          >
           <Image
            src="/instagram.webp"
            alt="Instagram"
            width={80}
            height={80}
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
          </a>
          <a
            href="https://www.linkedin.com/company/data-science-student-club/posts/?feedView=all"
            className="p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-200"
            target="_blank" rel="noopener noreferrer"

          >
            <Image
            src="/linkedn.png"
            alt="LinkedIn"
            width={80}
            height={80}
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
          </a>
          <a
            href="https://chat.whatsapp.com/JPlO3NzxSBf9LkG9uYspoA"
            className="p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-200 "
            target="_blank" rel="noopener noreferrer"
          >
             <Image
            src="/whatsapp.png"
            alt="Whatsapp"
            width={80}
            height={80}
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
          </a>
        </div>
      </div>
    </div>
  )
} 