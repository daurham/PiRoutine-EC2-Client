import React, { useEffect, useState } from "react";
import { useData } from "../Context";

export default function App() {
  const data = useData();
  
  return (
    <div>
      <h1>My App</h1>
      <h6>{data.textData.text}</h6>
    </div>
  );
};