import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { User } from '../User';
import axios from 'axios';
import Image from '../Parts/Image';

export default function SingleUser() {
  const { id } = useParams();
  const { user } = useContext(User);
  const [food, setFood] = useState(null);
  useEffect(() => {
      if (!id) return;
      axios.get(`/singleUser/${id}`)
      .then(response => setFood(response.data))
      .catch(error => console.error('Error fetching food data:', error)); // Add error handling
    }, [id]);
   

    const ownerInfo =  food[0].owner ;
    console.log(ownerInfo);
  console.log(food);
  console.log(id);

  return (
    <>
      <div className="mt-[150px] h-[100vh]">
          
        <section className="container mx-auto py-10 md:py-20 antialiased">
          {/* <h1> {ownerInfo.name} </h1>
          <h1> {ownerInfo.email} </h1> */}
          <section className="flex justify-center flex-wrap -mx-1 lg:-mx-4">
            {food?.map(foodItem => (
                <div key={foodItem._id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                  <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                    <Image className="object-cover aspect-square" src={foodItem.photos?.[0]} alt="" />
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="block font-sans text-1xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                        {foodItem.title}
                      </h5>
                    </div>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                    </p>
                  </div>
                  <div className="p-6 pt-3">
                    <Link to={`/single/${foodItem._id}`}>
                      <button
                        className="block w-full select-none rounded-lg bg-primary py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Visit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
      </div>
    </>
  );
}
