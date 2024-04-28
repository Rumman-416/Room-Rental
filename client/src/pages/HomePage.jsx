import BedroomImage from "../assets/images/bedroom.png";

function HomePage() {
  return (
    <div className="  ">
      <div className="flex justify-between px-5">
        <div className="text-3xl font-normal my-5  flex items-center">
          <img
            src="/Images/logo.png"
            alt=""
            className=" mix-blend-multiply w-10"
          />
          RentKar
        </div>

        <button className="rounded cursor-pointer border-2 my-4 p-2 border-BT">
          Log in
        </button>
      </div>

      <div className="w-4/5 max-w-md ">
        <img
          src={BedroomImage}
          alt="Bedroom"
          className=" h-3/6 rounded-l-lg rounded-r-full"
        />
      </div>

      <div className="my-8">
        <h2 className="text-3xl font-regular mx-9 my-4 flex items-center justify-start ">
          Why Us?
        </h2>
        <div className="flex flex-col justify-center items-center ">
          <div className="border-BT bg-BT bg-opacity-50 rounded-3xl shadow-lg w-10/12 p-4 ">
            <p className="text-gray-700">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here'.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <button className="bg-BT text-white font-regular m-2 h-10 rounded-full w-2/3  flex items-center justify-center">
            Sign in as Landlord
          </button>
          <button className="bg-BT text-white font-regular m-2 h-10 rounded-full w-2/3 flex items-center justify-center">
            Sign in as Tenant
          </button>
        </div>
      </div>
      <div className="text-center mt-4 bg-BT bg-opacity-50 py-2">
        <p className="text-black-500">footer %c copyright</p>
      </div>
    </div>
  );
}

export default HomePage;
