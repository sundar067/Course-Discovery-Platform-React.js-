// import { useEffect, useState } from "react";

// function App() {
//   const [text, setText] = useState('');
//   const [name,setName]=useState('love');

//   // //variation 1->every render
//   // useEffect( () => {
//   //   console.log("UI RENDERING DONE");
//   // });

//   //variation 2->first Render
//   // useEffect( () => { //ek hook h jo component ko allow krta h side effect ko handle krne ke liiye
//   //    console.log("UI RENDERING DONE");
//   //  },[]);//second pararmeter dependency ki list ko darsata h

//   // //variation 3->first Render +whenerver dependency changes
//   // useEffect( ()=>{
//   //   console.log("change observed")
//   // },[name]); 

//   // variation-4 ->to handle unmounting of a component
//   useEffect(()=>{
//     //add event Listener
//     console.log("Listener added");

//     return()=>{  //phele ye hi chlega then add hoga//cleaning ke liye hota h 
//       console.log("Listener removed");
//     }

//   },[text]);

//   function changeHandler(event) {
//     console.log(text);
//     setText(event.target.value);
//   }

//   return (
//     <div className="App">
//       <input type="text" onChange={changeHandler} />
//     </div>
//   );
// }
// export default App;
import React from "react";
import { apiUrl,filterData } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards"
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
//import { useEffect } from "react";

const App=()=>{

  const [courses,setCourses]=useState(null);
  const [loading,setLoading]=useState(true);
   const [category, setCategory] = useState(filterData[0].title);

    async function fetchData() {
      setLoading(true);
      try{
        let response =await fetch(apiUrl);
        let output = await response.json();
        //save data into a variable
        setCourses(output.data);
        
      }
      catch(error){
        toast.error("something went wrong");

      }
      setLoading(false);
     
    }
    useEffect(() =>{
     fetchData();
  },[])

  return (
    <div className="min-h-screen flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div
          className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]"
        >
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </div>
    </div>
  );
    
};

export default App;