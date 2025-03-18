import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

export default function SecondSlider() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* About Us Title - Left side on larger screens */}
            <div className="md:col-span-3 lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-medium border-b border-white inline-block pb-1">
                About Us
              </h2>
            </div>

            {/* Main Content - Right side on larger screens */}
            <div className="md:col-span-9 lg:col-span-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Heading */}
                <div className="lg:col-span-10 lg:col-start-1">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-medium leading-tight font-family-poppins">
                    VisAd is a dynamic advertising agency dedicated to crafting
                    innovative marketing solutions that connect brands with
                    their audiences.
                  </h1>
                </div>

                {/* Instagram Icon - Center on mobile, left on desktop */}
                <div className="flex justify-center lg:justify-start lg:col-span-2 lg:col-start-1 lg:mt-8 py-28">
                  <Link
                    href="https://instagram.com"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-colors"
                  >
                    <Instagram className="object-cover w-12 h-12 text-white" />
                  </Link>
                </div>

                {/* Description Paragraph - Right side */}
                <div className="lg:col-span-8 lg:col-start-5 py-28">
                  <p className="text-base md:text-2xl leading-relaxed ">
                    With a team of creative professionals, we specialize in
                    developing compelling campaigns across various platforms,
                    including digital, print, and social media. Our goal is to
                    help businesses elevate their presence, engage their
                    customers, and achieve measurable results. At VisAd, we
                    believe in the power of storytelling and creativity to drive
                    brand success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp button - fixed at bottom right */}
        <div className="fixed bottom-6 right-6 z-20">
          <Link
            href="https://wa.me/yourphonenumber"
            className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-7 h-7"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.55 15.58C16.28 16.11 15.3 16.71 14.67 16.85C14.2 16.95 13.59 17.03 11.77 16.31C9.5 15.42 8.08 13.16 7.97 13.01C7.87 12.86 7 11.7 7 10.5C7 9.3 7.61 8.7 7.83 8.46C8.05 8.22 8.33 8.16 8.5 8.16C8.67 8.16 8.84 8.16 8.99 8.17C9.15 8.18 9.37 8.13 9.59 8.64C9.81 9.15 10.32 10.35 10.37 10.45C10.42 10.55 10.45 10.67 10.38 10.82C10.31 10.97 10.27 11.07 10.17 11.19C10.07 11.31 9.96 11.46 9.87 11.55C9.77 11.64 9.67 11.74 9.79 11.97C9.91 12.2 10.32 12.87 10.93 13.42C11.73 14.14 12.39 14.36 12.62 14.46C12.85 14.56 12.97 14.54 13.09 14.4C13.21 14.26 13.6 13.81 13.74 13.58C13.88 13.35 14.02 13.38 14.21 13.45C14.4 13.52 15.59 14.11 15.8 14.21C16.01 14.31 16.15 14.36 16.2 14.44C16.25 14.53 16.25 15.05 15.98 15.58H16.55Z" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
