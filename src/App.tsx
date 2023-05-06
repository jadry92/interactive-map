import React from 'react';
import dataJson from './assets/data/data.json'
import Table from './Table';


const App: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className='text-center'>Map Example</h1>
        <p>
          This is an interactive map that create a "mark" on it base on the items selected on the tables behind
        </p>
      </div>
      
      <Table data={dataJson}/>
    </div>
  );
};

export default App;
