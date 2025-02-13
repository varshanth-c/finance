import React from 'react';
import Graph from './Graph';
import Form from './Form';
import {Link} from 'react-router-dom';
import 'normalize.css';
import '../App3.css';
export default function ExpenseTracker() {
  return (
    <div className="container mx-auto max-w-8xl text-center drop-shadow-lg text-white-rounded">
     <Link to="/home"> <h1 className="text-2xl  mb-8  text-#666666">TrackMe</h1></Link>
      <div className="grid md:grid-cols-2 gap-4">
        <Graph/>
        <Form />
      </div>
    </div>
  );
}