import './dashboard.scss';
import React, { useEffect, useState } from 'react';
import Navbar from '../navigation/Navbar';
import LineChart from '../Charts/LineChart';
import PolarChart from '../Charts/PolarChart';
import PieChart from '../Charts/PieChart';
import NewLineChart from '../Charts/NewLineChart';



const Dashboard = () => {

 
  
  

  return (
    <>
    <Navbar />
    <div className="p-4 mt-10 ml-64 body">
      <div className="top">
        <div className="pie-chart">
          <PieChart />
        </div>
        <div className="polar-chart">
          <PolarChart />
        </div>
      </div>
      <div className="bottom">
        
        <div className="line-chart">
          <LineChart />
        </div>
        <div className="line-chart">
          <NewLineChart />
        </div>
      </div>
      
        
      
    </div>
    
    </>
    
    
  );
};

export default Dashboard;
