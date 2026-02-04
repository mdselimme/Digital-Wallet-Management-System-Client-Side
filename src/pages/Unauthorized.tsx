import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="w-screen p-5 h-screen bg-amber-100 flex justify-center items-center content-center">
      <div className="p-20 bg-white text-center rounded-2xl">
        <h2 className="text-3xl font-bold mb-2">Oops!</h2>
        <h1 className="text-4xl font-extrabold mb-8">
          You are not authorized.
        </h1>
        <Link
          className="bg-accent-foreground text-white px-5 py-2 rounded-xl"
          to={"/dashboard"}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
