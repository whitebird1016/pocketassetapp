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
      <button className={className}>
        <b>{label}</b>
      </button>
    </div>
  );
};

export default Component;
