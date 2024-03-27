import { useState } from 'react'

const Square = () =>{

    const [number,setSquare] = useState(0)

    const handleChange = useMemo(()=>{
        return setSquare(number * 2)
    })
      

    return(
  <input type = 'text' value = {number} onChange = {(e)=>handleChange{(e.target.value)}}/>
    )
}


//make a api request inside the react component and render in the ui:

import {useEffect, useState} from 'react'

const myComponent = (()=>{
  const [data,setData] = useState(null)
  
  useEffect(()=>{
   const getData = async()=>{
    try{
     const response = await axios.get('');
     setData(response.data)
    }
    catch(error){
      console.log(error.message)
    }
   }
  getData()
  },[])

  return(
    <div>
      
        {data ? (
          <p>{data}</p>
        ) : (
          <p>Nothing</p>
        )
      }
    </div>
  )
})

export Default myComponent


//HOC.js

const higherComponent = ({wrappedComponent}) =>{
  return (props)=>{
    return <wrappedComponent {...props}/>
  }
}

//myComponent.js

const Component = () =>{
  return(
    <div>
      <p>{props.message}</p>
    </div>
  )
}

//App.js

const enhancedComponent = higherComponent(Component)

return(
  <enhanceComponent message = 'hello world'/>
)


