import React from "react";
import { useNavigate } from "react-router-dom";

export default function Denied() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <h1
        className="
            text-9xl
            text-center
            text-white tracking-widest"
      >
        403
      </h1>
      <div
        className="
                bg-black absolute text-sm -rotate-12 px-2 rounded 
                "
      >
        Access Denied
      </div>

      <button type="submit"
        onClick={() => navigate(-1)}
        className="
        btn mt-6 hover:bg-[#0c0f13]
            "
      >
        Go back
      </button>
    </main>
  );
}
