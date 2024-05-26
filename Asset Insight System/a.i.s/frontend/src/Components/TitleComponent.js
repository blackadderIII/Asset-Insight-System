import React from 'react'

export const TitleComponent1 =({title}) => {
   const todayDate = new Date()
    const formattedDate = todayDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
  return (
    <div class="first-row">
            <div class="greeting">
                <h1>{title}</h1>
                <p>An overview of all {title} in the organization</p>
            </div>
            <div class="date">
                <span id="todaysDate">Today, {formattedDate}</span>
            </div>
        </div>
  )
}

export const TitleComponent2 = ({title}) => {
  const todayDate = new Date()
   const formattedDate = todayDate.toLocaleDateString('en-US', {
       month: 'long',
       day: 'numeric',
       year: 'numeric'
     });
 return (
   <div class="first-row">
           <div class="greeting">
               <h1>{title}</h1>
               <p>An overview of all technological assets in the organization</p>
           </div>
           <div class="date">
               <span id="todaysDate">Today, {formattedDate}</span>
           </div>
       </div>
 )
}

