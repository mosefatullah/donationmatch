import { DonorCard } from "./DonorCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { topDonors } from "../utils/API";

export default function TopDonors() {
 const [donors, setDonors] = useState(null);
 useEffect(() => {
  topDonors(
   (d) => {
    setDonors(d.data);
   },
   (err) => {
    setDonors(false);
    console.log(err);
   }
  );
 }, []);
 return (
  <div className="w-full max-w-7xl px-8 mx-auto flex flex-col pb-5">
   <div className="w-full flex flex-col items-start rounded-lg">
    <div className="w-full mt-5 flex items-center justify-between">
     <div className="text-4xl font-semibold leading-none max-md:text-4xl">
      Top Donors
     </div>
     <button className="text-sm font-semibold text-white bg-orange-600 px-4 py-2 gap-2 rounded-lg flex items-center">
      Donate Something{" "}
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth={1.5}
       stroke="currentColor"
       className="size-4"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
       />
      </svg>
     </button>
    </div>
    <div className="mt-10">
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.isArray(donors) ? (
       donors.length > 0 ? (
        donors.map((d, index) => (
         <div key={index} className="w-full">
          <DonorCard
           id={d._id}
           name={d.user.name}
           donationType={d.category}
           donations={d.user.donation_count}
           imageSrc={d.user.profile_photo}
          />
         </div>
        ))
       ) : (
        <div className="col-span-full text-center p-4 bg-gray-100 rounded-lg shadow-md">
         <p className="text-gray-500 text-lg font-semibold">
          No donors available
         </p>
        </div>
       )
      ) : donors === false ? (
       <div className="col-span-full text-center p-4 bg-red-100 rounded-lg shadow-md">
        <p className="text-red-500 text-lg font-semibold">
         Failed to load donors
        </p>
       </div>
      ) : (
       <div className="col-span-full text-center p-4 bg-blue-100 rounded-lg shadow-md">
        <p className="text-blue-500 text-lg font-semibold">Loading...</p>
       </div>
      )}
     </div>
    </div>

    <Link to="/view/donors" className="self-end mt-5 hover:text-sky-600">
     <button>View More..</button>
    </Link>
   </div>
  </div>
 );
}