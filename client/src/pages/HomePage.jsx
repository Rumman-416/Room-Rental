import BedroomImage from "../assets/images/bedroom.png";

function HomePage() {
  return (
    <div className="container relative min-h-screen bg-background ">
      <div className="text-3xl font-normal text-brandPrimary mb-4 p-3">
        RentKar
      </div>
      <div className="absolute top-0 right-4">
        <button className="text-brandPrimary font-normal py-2 px-4 rounded cursor-pointer">
          Log in
        </button>
      </div>

      <div className="w-5/6 max-w-md overflow-hidden">
        <img
          src={BedroomImage}
          alt="Bedroom"
          className="w-full h-auto rounded-l-lg rounded-r-full"
        />
      </div>

      <div className="my-8">
        <h2 className="text-3xl font-regular text-brandPrimary mb-4 px-20">
          Why Us?
        </h2>
        <div
          className="bg-card rounded-3xl shadow-lg p-4 mx-auto"
          style={{ width: "90vw" }}
        >
          <p className="text-gray-700">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here'.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button className="bg-BT text-black font-regular py-2 px-4 rounded-full w-38 mb-4">
          Sign in as a room owner
        </button>
        <button className="bg-BT text-black font-regular py-2 px-4 rounded-full w-38 mb-4">
          Sign in as a tenant
        </button>
      </div>
      <div class="text-center mt-4 bg-card py-2">
        <p class="text-black-500">footer copyright</p>
      </div>
    </div>
  );
}

export default HomePage;
