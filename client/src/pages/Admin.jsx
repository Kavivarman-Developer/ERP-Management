import { useState, useEffect } from "react";
import Sidebar from "../components/dashboards/visitors/Sidebar";
import axios from "axios";
import Visitors from "../components/dashboards/visitors/Visitors";



export default function Admin() {
  

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Visitors />
      
    </div>
  );
} 