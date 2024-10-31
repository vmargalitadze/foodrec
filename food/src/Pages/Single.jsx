import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { User } from '../User'

import Comments from '../Parts/Comments'
import Image from '../Parts/Image'

export default function Single() {
  const {id} = useParams()
  const {user} =  useContext(User)
  const [food, setFood] = useState(null)
  const [lineThrough, setLineThrough] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  useEffect( () => {
    if(!id) return
    axios.get(`/single/${id}`)
    .then( response =>  setFood(response.data))
  }, [id] )
  
  const ing = food?.ingredients

  
 

  function toggleItem(index) {
    setCheckedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index]; 
      return newState;
    });
  }

  
  
  

  const addToFavorites = async () => {
    try {
      const userId = user.id;
      const name = food.title;
      const foodId = food._id; 
      const photos = food.photos
      await axios.post('/add-to-favourite', { userId, foodId, name, photos });
    } catch (error) {
      console.error('Error adding item to favorites:', error);
    }
  };
  
if(!food) return ''
  return (
    <>
    
    <div className='mt-[130px] bg-gray-100  w-full px-8 pt-8 text-center' > 
    <h1 className='text-3xl text-center ess'>  {food.title} </h1>
    

<div className="max-w-screen-2xl mx-auto py-4 lg:py-6 relative ">
    <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col">
               
            {food.photos?.[0] && (
         <Image className="rounded-2xl object-cover aspect-square" src={food.photos?.[0]} alt=""/>
      )}
            </div>
        </div>
        <div className="flex flex-1">
            <div className="grid grid-cols-2 gap-2">
            {food.photos?.[1] && (
       <div>

<Image className="rounded-2xl  aspect-square" src={food.photos?.[1]} alt=""/>
       </div>
      )}
              <div>
              
              {food.photos?.[2] && (
        <Image className="rounded-2xl  aspect-square" src={food.photos?.[2]} alt=""/>
      )}
              </div>
              <div>
               
              {food.photos?.[3] && (
        <Image className="rounded-2xl  aspect-square" src={food.photos?.[3]} alt=""/>
      )}
              </div>
              <div>
       
              {food.photos?.[4] && (
        <Image className="rounded-2xl  aspect-square" src={food.photos?.[4]} alt=""/>
      )}
              </div>
            </div>
        </div>
    </div>
</div>

<div className=" p-6">

    <div class="flex justify-center flex-col md:flex-row lg:flex-row">
    <div class="flex p-2 m-2 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
        <span>Category - {food.category}</span>
    </div>
    <div class="flex p-2 m-2 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Time - {food.time} minutes </span>
    </div>
    <div class="flex p-2 m-2 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
        <span>Difficulty - {food.difficulty}</span>
    </div>
</div>

     
    </div>


<div class="mb-6">
    <h4 class=" font-medium text-default-700 text-2xl mb-4">Nutrition </h4>

    <div class="border border-gray-800 p-3 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div  class="nutr text-center">
                <h4 class="text-base font-medium text-gray-800 mb-1">Carbs: {food.carbs}g</h4>
               
            </div>
            <div  class="nutr text-center">
                <h4 class="text-base font-medium text-gray-800 mb-1">Fat: {food.fat}g</h4>
               
            </div>

            <div  class="nutr text-center">
                <h4 class="text-base font-medium text-gray-800 mb-1">Protein: {food.protein}g</h4>
               
            </div>

            <div  class="nutr text-center">
                <h4 class="text-base font-medium text-gray-800 mb-1">Calories: {food.calories}kcal</h4>
               
            </div>

    </div>
</div>


<div className="">

<div className="text">
 
  <span className="lines"></span>
</div>
<div class="min-h-screen  p-6">

  <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2">

  
    <div class="md:flex md:flex-col md:mt-10">
    <div className="text">
  <h1 className='text-2xl ml-3'>Ingredients</h1>
  
</div>


<div className="container1 ">
      <div className="text1">
        <ul>
        {ing.map((item, index) => (
            <li key={index} className="h" onClick={() => toggleItem(index)}>
              <span className={checkedItems[index] ? "checked" : "circle"}>{checkedItems[index] ? "✓" : ""}</span>
              <span className={checkedItems[index] ? "line-through" : ""}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>

    {/* <!-- right --> */}
    <div class="">
      <div class="w-full    ">
      <div className="py-10">
<h1 className='text-2xl  mb-5'> Instructions</h1>
<h2 className='text-start '> {food.instructions} </h2>
</div>
      </div>
    </div>

  </div>



<div className="mt-[60px]">


{user && (
        <button onClick={addToFavorites} className="text-center texttt uppercase py-2 px-6 rounded-full bg-primary text-white">
          Add To Favourite
        </button>
      )}

     <div className="py-6 container w-full lg:w-2/3 xl:w-1/2 mx-auto">
  <h1 className='text-2xl mb-5'>Comments</h1>
  <Comments foodId={food._id} />

 
</div>

</div>
</div>





</div>


    </div>
    </>
  )
}
