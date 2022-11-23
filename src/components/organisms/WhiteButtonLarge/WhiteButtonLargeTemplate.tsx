import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  onClick: any;
  className: string;
};

const Component = ({ label, onClick, className }: Props) => {
  return (
    <div>
      <button className={"whiteButtonLarge"}>{label}</button>
    </div>
  );
};

export default Component;
