import {ChevronDown}  from "lucide-react"

export default function HomeOne(){

    return (
        <>
          <div className=" top-0 left-0 right-0 z-10 min-h-screen flex flex-col bg-black">
        <main className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-400 mb-4">VisAd</h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-12">
              Elevate Your Brand With Innovative Marketing Solutions
            </h2>

            <div className="w-64 h-px bg-gray-700 mb-8"></div>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              Boost your brand with creative marketing solutions designed to engage, inspire, and deliver results. Let
              us help you connect with your audience and drive success.
            </p>
          </div>
        </main>

        {/* Scroll down button */}
        <div className="absolute bottom-8 right-28 flex items-center gap-4">
          <button className=" w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
            <ChevronDown className="w-6 h-6 text-black" />
          </button>

          {/* Green contact button */}
          
        </div>
      </div>
        </>
    )
}