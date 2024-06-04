import React from "react";

export default function Badge(props) {
  return (
    <>
      <span className={`${props?.css} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
       {props?.title}
      </span>
    </>
  );
}
