import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../Parts/Pagination';
import AccauntNav from '../Parts/AccauntNav';
import Image from '../Parts/Image';

export default function AdminItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [food, setFood] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/allFood').then((res) => {
      setFood(res.data);
    });
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredFood = food.filter((foodItem) =>
    foodItem.title.toLowerCase().includes(search.toLowerCase())
  );

  async function deleteFood(id){
 
    try {
      await axios.delete(`/delete/${id}`);
      setFood(food.filter(item => item._id !== id));
      console.log('deleted');
     
    } catch (error) {
      console.error('Error delete:', error);
      throw error;
    }
  }

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredFood.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className='mt-[150px] mb-6'>
        <AccauntNav />
        <section className="container mx-auto py-10 md:py-20 antialiased">
        <div className="flex justify-center flex-wrap -mx-1 lg:-mx-4">

{currentPosts.map((foodItem) => (
      <div key={foodItem._id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      
        <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
<div
className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
<Image className=" object-cover aspect-square" src={foodItem.photos?.[0]} alt=""/>
<div
  className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
</div>

</div>
<div className="p-6">
<div className="flex items-center justify-between mb-3">
  <h5 className="block font-sans text-1xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
  {foodItem.title}
  </h5>
</div>
<p>Created by - {foodItem.owner.name}</p>
<p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
 
</p>

</div>
<div className="p-6 pt-3">
<Link to={'/account/food/'+foodItem._id}>
<button 
  className="block w-full texttt select-none rounded-lg bg-primary py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  type="button">
    
  Edit
</button>
    </Link>

    <button
  type="button"
  onClick={() => deleteFood(foodItem._id)}
  className="block w-full texttt text-1xl mt-[50px] select-none rounded-lg bg-primary py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
  Delete
</button>
</div>
</div> 
      </div>
    ))}
    </div>
          <section className="grid lg:grid-cols-2 2xl:grid-cols-4 grid-cols-1 gap-8">
            


          </section>
        </section>
        <Pagination totalPosts={filteredFood.length} postsPerPage={postPerPage} paginate={paginate} />
      </div>
    </>
  );
}
