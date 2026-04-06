import React from 'react';
import  { useState } from 'react'
import Card from './Card'

const Cards=(props)=>{
    let courses=props.courses;
    let category=props.category;
    const[likedCourses,setLikedCourses]=useState([]);


    //returns you a list of all courses recieved from the api response
    function getCourses(){
      if (!courses) return []; 

      if (category === "All") {
        let allCourses = [];
        Object.values(courses).forEach((array) => {
          array.forEach((courseData) => {
            allCourses.push(courseData);
          });
        });
        return allCourses;
      } else {
        //main sirf specific categiry ka data array krunga
        return courses[category];
      }
    }



    return (
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {getCourses().map((course) => (
          <Card key={course.id} 
          course={course} 
          likedCourses={likedCourses}
          setLikedCourses={setLikedCourses} />
        ))}
      </div>
    );

};

export default Cards
