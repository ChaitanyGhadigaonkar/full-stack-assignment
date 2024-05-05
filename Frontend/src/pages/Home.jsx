import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="flex-1 h-full">
      <div className="top flex justify-center flex-col gap-2 py-10 md:py-20">
        <h1 className="text-4xl font-semibold font-mono md:text-6xl">
          Go anywhere with OLA
        </h1>

        <div className="location-box flex flex-col gap-6">
          <p className="text-lg font-semibold md:text-2xl md:mb-4">
            Request a ride, hop in, and go.
          </p>

          <img
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_595,h_744/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png"
            alt="hero-image"
            srcSet=""
            className="w-full h-96 object-cover rounded-lg md:h-[400px] lg:h-[500px] xl:h-[600px]"
          />
        </div>
      </div>

      <div className="mid my-2 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold font-mono md:text-4xl">
          Drive when you want, make what you need
        </h1>
        <p className="text-base font-semibold md:text-lg">
          Make money on your schedule with deliveries or rides—or both. You can
        </p>
        <p className="text-base font-semibold md:text-lg">
          use your own car or choose a rental through Uber.
        </p>

        <div className="flex items-center gap-4 md:w-full md:gap-10">
          <button className="default-btn md:text-lg md:px-6 md:py-2">
            <Link to={"/login"}>Get Started</Link>
          </button>
          <button className="ghost md:text-lg md:px-6 md:py-2">
            <Link to="/users/book-now">Book Now </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
