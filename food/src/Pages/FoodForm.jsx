import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AccauntNav from '../Parts/AccauntNav';
import PhotoUploader from '../Parts/PhotoUploader';

export default function FoodForm() {
  const {id} = useParams()
  console.log(id);
    const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [category, setCategory] = useState('')
  const [time, setTime] = useState();
  const [difficulty, setDifficulty] = useState('')
  const [calories, setCalories] = useState([])
  const [carbs, setCarbs] = useState([])
  const [protein, setProtein] = useState([])
  const [fat, setFat] = useState([])
  const navigate = useNavigate();

  // calories, carbs, protein, fat

  useEffect( () => {
    if(!id) {
      return
    }
    axios.get('/food/' + id ).then( response => {
      const {data} = response
      setTitle(data.title)
      setIngredients(data.ingredients)
      setAddedPhotos(data.photos)
      setInstructions(data.instructions)
      setTime(data.time)
      setCategory(data.category)
      setDifficulty(data.difficulty)
      setCalories(data.calories)
      setCarbs(data.carbs)
      setProtein(data.protein)
      setFat(data.fat)
    })
  }, [id] )
  


  

  async function addNewPlace(e) {
    e.preventDefault();
    
    try {
      if(id) {
        await axios.put('/food', {
          id,
          title,
          ingredients, 
          addedPhotos,
          instructions,
          time,
          category,
          difficulty,
          calories, carbs, protein, fat
        });
        navigate('/account/food');
      } else {

        await axios.post('/food', {
          title,
          ingredients, 
          addedPhotos,
          instructions,
          time,
          category,
          difficulty,
          calories, carbs, protein, fat
        });
        navigate('/account/food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  }



  return (
    <>
    
    <div className="mt-[150px]  ">
    <AccauntNav />
    <div className=" min-h-screen flex items-center">
   <div className="w-full">
   
     <div className="bg-white p-10 rounded-lg mt-[50px] mb-[50px] shadow md:w-3/4 mx-auto lg:w-1/2">
       <form onSubmit={addNewPlace}  action="">
         <div className="mb-5">
         
           <input type="text" required={!id} value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' className="border border-gray-300 shadow p-3 w-full rounded mb-" />
         </div>

         <div className="mb-5">
         
           <input type="text" required={!id} value={category} onChange={e => setCategory(e.target.value)} placeholder='Category' className="border border-gray-300 shadow p-3 w-full rounded mb-" />
        
         </div>

         <div className="mb-5">
         
           <input type="text" required={!id} value={difficulty} onChange={e => setDifficulty(e.target.value)} placeholder='Difficulty' className="border border-gray-300 shadow p-3 w-full rounded mb-" />
        
         </div>

      

         <div className="mb-5">
         <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
         </div>

         <div className="mb-5">
         <input type="number" className="border border-gray-300 shadow p-3 w-full rounded mb-" required={!id} value={time} onChange={e => setTime(e.target.value)} placeholder='Cooking Time' />
         </div>

         <div className="mb-5">
         <input type="number" className="border border-gray-300 shadow p-3 w-full rounded mb-" required={!id} value={calories} onChange={e => setCalories(e.target.value)} placeholder='Calories' />
         </div>

         <div className="mb-5">
         <input type="number" className="border border-gray-300 shadow p-3 w-full rounded mb-" required={!id} value={carbs} onChange={e => setCarbs(e.target.value)} placeholder='Carbs' />
         </div>

         <div className="mb-5">
         <input type="number" className="border border-gray-300 shadow p-3 w-full rounded mb-" required={!id} value={protein} onChange={e => setProtein(e.target.value)} placeholder='Protein' />
         </div>

         <div className="mb-5">
         <input type="number" className="border border-gray-300 shadow p-3 w-full rounded mb-" required={!id} value={fat} onChange={e => setFat(e.target.value)} placeholder='Fat' />
         </div>

         <div className="mb-5">
         
         <textarea className="border border-gray-300 shadow p-3 w-full rounded mb-"  required={!id}
      value={ingredients.join('\n')} 
      onChange={e => {
      const newIngredients = e.target.value.split('\n').filter(Boolean);
      
      setIngredients(newIngredients);
      }} 
      placeholder='Ingredients' 
      />
        
         </div>


      
        

         <div className="mb-5">
     
      
         <textarea className="border border-gray-300 shadow p-3 w-full rounded mb-"  required={!id}
      value={instructions.join('\n')} 
      onChange={e => {
      const newIngredients = e.target.value.split('\n').filter(Boolean);
      
      setInstructions(newIngredients);
      }} 
      placeholder='Instruction' 
      />
         </div>

         <button className="bg-primary w-[200px] uppercase  text-white font-bold py-2 px-4 rounded-full my-4 flex justify-center mx-auto">Save</button>
       </form>
     </div>
   </div>
 </div>
   
  </div>
    </>
  )
}
