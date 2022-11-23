import { useEffect, useState } from "react";

const useCounter=(time:string)=>{
    const [timer,setTimer]=useState(Number(time))
    useEffect(()=>{
        if(timer>0)
        setTimeout(()=>{setTimer(timer-1)},1000)

    },[timer])
    return timer;
   
}
export default useCounter;