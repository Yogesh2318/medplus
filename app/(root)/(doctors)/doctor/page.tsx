'use client';
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import useGlobalStore from "@/zustand/useProps";
import Image from "next/image";
import Link from "next/link";

const DoctorHome = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { setDoctorId, setUserId, role, setRole } = useGlobalStore();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const userRole = user.publicMetadata.role as string | undefined;
      const userId = user.publicMetadata.userId as string | undefined;

      if (userRole) {
        setRole(userRole);
        localStorage.setItem("role", userRole);
      } else {
        setRole("doctor");
        localStorage.setItem("role", "doctor");
      }
      if(userId){
        setUserId(userId);
        localStorage.setItem("userId", userId);
      } 

      if (userId && role === "doctor") {
        const storedDoctorId = localStorage.getItem("doctorId");

        if (storedDoctorId) {
          setDoctorId(storedDoctorId);
        } else {
          const fetchDoctorId = async () => {
            try {
              const response = await fetch(`/api/doctors/search?userId=${userId}`);
              if (!response.ok) throw new Error("Doctor not found");

              const data = await response.json();
              setDoctorId(data._id);
              localStorage.setItem("doctorId", data._id); 
            } catch (error) {
              console.error("Error fetching doctor:", error);
            }
          };
          fetchDoctorId();
        }
      }
    }
  }, [isLoaded, isSignedIn, user, setRole, setUserId, setDoctorId, role]);
  return (
    <div className='grid  grid-flow-row lg:grid-flow-col auto-rows-[50%] lg:auto-cols-[73%] lg:gap-6 overflow-y-auto lg:overflow-x-auto overscroll-contain mx-100  snap-mandatory scroll-p-10'>
   

    <div className="mx snap-start min-h-[90%] lg:min-h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-10 items-center justify-center bg-emerald-400/30 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-[2.5rem] shadow-lg pt-0 pb-16 px-12 w-[95%] ">
        <div className='flex flex-col lg:flex-row items-center justify-center lg:ml-10'>
          <div className='flex flex-col justify-start items-start gap-16 mt-10 lg:mt-0'>
            <h1 className="text-6xl font-bold text-black tracking-wider">MedInfo</h1>
            <p className="text-sm text-gray-700"> Your Medicine Guide. Get detailed insights about your prescriptions with MedInfo, your trusted companion for medicine information. From uses and dosages to potential side effects and precautions, MedInfo provides all the details you need to make informed decisions about your health. Empower your health with knowledge at your fingertips!
</p></div>
          <Image src="/assets/images/img4.png" alt="Logo" className="img-fluid" id="logo" width={450} height={450} />
        </div>
        <Link href="/" className="bg-black text-white font-semibold rounded-lg text-4xl px-7 py-4 self-start tracking-wider text-center lg:ml-10">Find Hospitals</Link>
      </div>
    </div>


  


    <div className="mx snap-start min-h-[90%] lg:min-h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-10 items-center justify-center bg-emerald-400/30 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-[2.5rem] shadow-lg pt-0 pb-16 px-12 w-[95%] ">
        <div className='flex flex-col lg:flex-row items-center justify-center lg:ml-10'>
          <div className='flex flex-col justify-start items-start gap-16 mt-10 lg:mt-0'>
            <h1 className="text-6xl font-bold text-black tracking-wider">Inventory</h1>
            <p className="text-sm text-gray-700"> Your Resource Tracker. Stay on top of critical healthcare resources with Inventory. Whether it&apos;s tracking the quantity of medicines, oxygen cylinders, or other essential supplies, this feature ensures you&apos;re always informed and prepared. Maintain seamless management and make timely decisions with real-time updates on availability. 
Efficient resource management, anytime, anywhere!
</p></div>
          <Image src="/assets/images/img3.png" alt="Logo" className="img-fluid" id="logo" width={450} height={450} />
        </div>
        <Link href="/" className="bg-black text-white font-semibold rounded-lg text-4xl px-7 py-4 self-start tracking-wider text-center lg:ml-10">Find Hospitals</Link>
      </div>
    </div>
    

    <div className="mx snap-start min-h-[90%] lg:min-h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-10 items-center justify-center bg-emerald-300/30 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-[2.5rem] shadow-lg pt-0 pb-16 px-12 w-[95%] ">
        <div className='flex flex-col lg:flex-row items-center justify-center lg:ml-10'>
          <div className='flex flex-col justify-start items-start gap-16 mt-10 lg:mt-0'>
            <h1 className="text-6xl font-bold text-black tracking-wider">HealthChat</h1>
            <p className="text-sm text-gray-700"> Connect with Your Doctor Instantly
Experience seamless communication with HealthChat, a real-time chat system designed to bridge the gap between patients and doctors. Whether it&apos;s clarifying doubts, sharing updates, or seeking quick advice, HealthChat ensures secure and direct interaction, fostering better understanding and personalized care.

Your health questions, answered—anytime, anywhere!</p></div>
          <Image src="/assets/images/img5.png" alt="Logo" className="img-fluid" id="logo" width={450} height={450} />
        </div>
        <Link href="/" className="bg-black text-white font-semibold rounded-lg text-4xl px-7 py-4 self-start tracking-wider text-center lg:ml-10">Find Hospitals</Link>
      </div>
    </div>


    <div className="mx snap-start min-h-[90%] lg:min-h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col gap-10 items-center justify-center bg-emerald-400/30 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-[2.5rem] shadow-lg pt-0 pb-16 px-12 w-[95%] ">
        <div className='flex flex-col lg:flex-row items-center justify-center lg:ml-10'>
          <div className='flex flex-col justify-start items-start gap-16 mt-10 lg:mt-0'>
            <h1 className="text-6xl font-bold text-black tracking-wider">Community Updates</h1>
            <p className="text-sm text-gray-700">Stay Informed, Stay Ahead. 
Keep up with the latest breakthroughs and advancements in the medical field with Community Updates. From innovative treatments and health tips to critical news and discoveries, this feature ensures you&apos;re always in the loop with what&apos;s shaping the world of healthcare.

Knowledge that empowers, updates that inspire!</p></div>
          <Image src="/assets/images/img6.png" alt="Logo" className="img-fluid" id="logo" width={450} height={450} />
        </div>
        <Link href="/" className="bg-black text-white font-semibold rounded-lg text-4xl px-7 py-4 self-start tracking-wider text-center lg:ml-10">Find Hospitals</Link>
      </div>
    </div>


  </div>
  )
}

export default DoctorHome
