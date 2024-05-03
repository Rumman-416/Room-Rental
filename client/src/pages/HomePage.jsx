import { Link } from "react-router-dom";
import BedroomImage from "../assets/images/bedroom.png";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <div className=" flex flex-col md:min-h-[91vh] lg:min-h-[95vh]">
        <div className="flex justify-between px-5">
          <div className="text-3xl font-normal my-5  flex items-center lg:gap-5">
            <img
              src="/Images/logo.png"
              alt=""
              className=" mix-blend-multiply w-10"
            />
            RentKar
          </div>
          <Link to={"/login"}>
            <button className="rounded cursor-pointer border-2 my-4 p-2 border-BT">
              Log in
            </button>
          </Link>
        </div>
        <div className=" flex flex-col md:flex-row md:mt-16">
          <div className="w-4/5 max-w-md md:w-[100rem] lg:w-[80rem] xl:w-[100rem] ">
            <img
              src={BedroomImage}
              alt="Bedroom"
              className=" w-full rounded-l-lg rounded-r-full"
            />
          </div>

          <div className="my-8 flex flex-col gap-3">
            <h2 className="text-3xl font-regular mx-9 my-4 flex items-center justify-start lg:mx-20 xl:text-5xl xl:mx-[27rem]">
              Why Us?
            </h2>
            <div className="flex flex-col justify-center items-center ">
              <div className="border-BT bg-BT bg-opacity-50 rounded-3xl shadow-lg w-10/12 xl:w-5/12 p-4 lg:p-5">
                <p className="text-gray-700 lg:text-lg xl:text-xl">
                  RentKar revolutionizes short-term accommodations with its
                  user-friendly platform, simplifying booking and management.
                  Offering cost-effective alternatives to traditional hotels,
                  RentKar empowers users to find comfortable, budget-friendly
                  spaces. It addresses the growing demand for flexible and
                  affordable lodging, reshaping the short-term accommodation
                  landscape.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <Link to={"/register"}>
                <button className="bg-BT text-white font-regular p-3 w-20 rounded-lg flex items-center justify-center xl:text-xl xl:w-32">
                  Sign
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
