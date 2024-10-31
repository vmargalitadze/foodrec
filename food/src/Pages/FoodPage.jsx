import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {User} from "../User";
import axios from 'axios'
import AccauntNav from '../Parts/AccauntNav';
import Image from '../Parts/Image';
import Pagination from '../Parts/Pagination';
export default function FoodPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [food, setFood] = useState([])
  const [search, setSearch] = useState('');
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  const navigate = useNavigate();
  if(!User) {
    navigate('/login'); 
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  useEffect( () => {
    axios.get('/users-food').then( ({data}) => {
      setFood(data)
    } )
  } )
  
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


  const filteredFood = food.filter((foodItem) =>
  foodItem.title.toLowerCase().includes(search.toLowerCase())
);

const lastIndex = currentPage * postPerPage;
const firstIndex = lastIndex - postPerPage;

const currentPosts = filteredFood.slice(firstIndex, lastIndex);
  return (
    <>
  
  <div>
    <div className="text-center mt-[150px] ">
    <AccauntNav />
          <Link className="inline-flex uppercase mt-3 gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/food/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new Recipe
          </Link>
        </div >
      
<div className="container my-12 mx-auto px-4 md:px-12 h-[150vh]">
    <div  className="flex flex-wrap -mx-1 lg:-mx-4">

    {currentPosts?.map((foodItem) => (
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
  </div>
</div> 
          </div>
        ))}

     
     

    </div>
<Pagination totalPosts={filteredFood.length} postsPerPage={postPerPage} paginate={paginate} />
</div>
    </div>
    </>
  )
}
