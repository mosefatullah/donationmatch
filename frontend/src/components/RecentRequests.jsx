import { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import { Link } from "react-router-dom";
import { recentRequests } from "../utils/API";

export default function RecentRequests() {
 const [requests, setRequests] = useState(null);
 useEffect(() => {
  recentRequests(
   (data) => {
    setRequests(data.data);
   },
   (err) => {
    setRequests(false);
    console.log(err);
   }
  );
 }, []);
 return (
  <div className="w-full max-w-7xl px-8 mx-auto flex overflow-hidden flex-col">
   <div className="w-full mt-5 flex items-center justify-between">
    <div className="z-10 self-start text-4xl font-semibold leading-none max-md:text-4xl">
     Recent Requests
    </div>
    <button className="text-sm font-semibold text-white bg-orange-600 px-4 py-2 gap-2 rounded-lg flex items-center">
     New Request{" "}
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
   <div className="mt-11">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     {Array.isArray(requests) ? (
      requests.length > 0 ? (
       requests.map((request, index) => (
        <div key={index} className="w-full">
         <RequestCard
          id={request._id}
          name={request.user.name}
          need={request.category}
          address={request.address}
          date={request.date}
          mobile={request.phone}
         />
        </div>
       ))
      ) : (
       <div className="col-span-full text-center p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-gray-500 text-lg font-semibold">
         No requests available
        </p>
       </div>
      )
     ) : requests === false ? (
      <div className="col-span-full text-center p-4 bg-red-100 rounded-lg shadow-md">
       <p className="text-red-500 text-lg font-semibold">
        Failed to load requests
       </p>
      </div>
     ) : (
      <div className="col-span-full text-center p-4 bg-blue-100 rounded-lg shadow-md">
       <p className="text-blue-500 text-lg font-semibold">Loading...</p>
      </div>
     )}
    </div>
    <div className="flex mb-8 flex-col items-start ">
     <Link to="/view/requests" className="self-end mt-5 hover:text-sky-600">
      <button>View More..</button>
     </Link>
    </div>
   </div>
  </div>
 );
}