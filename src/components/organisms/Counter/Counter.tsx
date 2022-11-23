import React from "react";
import { Typography } from "@mui/material";
import useCounter from "../../../components/hooks/useCounter";

type Props = {
  time:string;
}
const Component = ({...props}:Props) => {
  const timer=useCounter(props.time);
  let min,sec=0;
  if(timer>0)
  {
    min=Math.floor(timer/60);
    sec=timer%60;
  }
  return (
    <div className='text-white pt-12'>
      <Typography>
       Remaining Time : {min+" min "+sec+" sec"}
      </Typography>
    </div>
  );
};

export default Component;
