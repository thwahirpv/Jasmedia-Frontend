"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function BackgroundComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 top-[navbar-height] w-full overflow-hidden pointer-events-none -z-10">
      {/* Fixed background container */}
      <div className="absolute inset-0 bg-black">
        {/* You can add a background image here if needed */}
        {/* <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center" /> */}
      </div>

      {/* Fixed content */}
      <div className="absolute inset-0 flex flex-col">
        {/* Main content area - takes up most of the page */}
        <main className="flex-1 flex items-end justify-start p-6">
          <div className="text-gray-300 text-center pointer-events-auto">
            <h1 className="text-8xl font-light mb-8">info@visad.me</h1>
            <Link
              to="https://instagram.com"
              className="inline-flex items-center text-gray-300 hover:text-gray-300 transition-colors"
            >
              Instagram <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
            <p className="mt-6 text-lg max-w-md mx-auto">Empowering businesses with innovative digital solutions.</p>
          </div>
        </main>

        {/* Footer section */}
        <footer className="p-6 text-white">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start pointer-events-auto">
            <div className="mb-8 md:mb-0">
              <p className="text-sm text-gray-400">Copyright © 2025 visad.me | Powered by visad.me</p>
            </div>

            <div>
              <h3 className="text-xl mb-4">Quick Links</h3>
              <nav>
                <ul className="space-y-2">
                  {["Home", "About Us", "Services", "Portfolio", "Contact Us"].map((item) => (
                    <li key={item}>
                      <Link to="#" className="flex items-center text-white hover:text-gray-300 transition-colors">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </footer>

        {/* WhatsApp button - absolutely positioned */}
        <div className="fixed bottom-6 right-6 z-20 pointer-events-auto">
          <Link
            to="https://wa.me/yourphonenumber"
            className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.55 15.58C16.28 16.11 15.3 16.71 14.67 16.85C14.2 16.95 13.59 17.03 11.77 16.31C9.5 15.42 8.08 13.16 7.97 13.01C7.87 12.86 7 11.7 7 10.5C7 9.3 7.61 8.7 7.83 8.46C8.05 8.22 8.33 8.16 8.5 8.16C8.67 8.16 8.84 8.16 8.99 8.17C9.15 8.18 9.37 8.13 9.59 8.64C9.81 9.15 10.32 10.35 10.37 10.45C10.42 10.55 10.45 10.67 10.38 10.82C10.31 10.97 10.27 11.07 10.17 11.19C10.07 11.31 9.96 11.46 9.87 11.55C9.77 11.64 9.67 11.74 9.79 11.97C9.91 12.2 10.32 12.87 10.93 13.42C11.73 14.14 12.39 14.36 12.62 14.46C12.85 14.56 12.97 14.54 13.09 14.4C13.21 14.26 13.6 13.81 13.74 13.58C13.88 13.35 14.02 13.38 14.21 13.45C14.4 13.52 15.59 14.11 15.8 14.21C16.01 14.31 16.15 14.36 16.2 14.44C16.25 14.53 16.25 15.05 15.98 15.58H16.55Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

