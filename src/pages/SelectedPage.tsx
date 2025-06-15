import React from "react";
import { useNavigate } from "react-router-dom";

const SelectedPage = () => {
  const selected = JSON.parse(localStorage.getItem("selectedSatellites") || "[]");

   const navigate = useNavigate();
  
    const handleBack = () => {
      navigate("/");
    };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Selected Satellites</h2>
      {selected.length === 0 ? (
        <p>No satellites selected.</p>
      ) : (
        <ul className="list-disc ml-5">
          {selected.map((sat: any) => (
            <li key={sat.noradCatId}>
              {sat.name} (NORAD ID: {sat.noradCatId})
            </li>
          ))}
        </ul>
      )}

      <div className=" m-2">
        <button
          className="ml-auto block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleBack}
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default SelectedPage;
