import React, { useState, useEffect } from 'react';
import '../../styles/setBalance.scss';


const SetBalance = () => {
  
  return (
    <div className="p-4 mt-8 ml-64 body">
        <h3>Set Balance</h3>
         <form>
        
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button  class="btn btn-primary">Submit</button>
      </form>
    </div>
   
  );
};

export default SetBalance;
