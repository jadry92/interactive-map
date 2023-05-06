import React from 'react';
import dataJson from './assets/data/data.json'
import Table from './Table';


const data: DataJson[] = dataJson.map(row => (
  {
    id: row.id,
    name: row.name,
    location: row.location,
    count: row.count,
    coordinates: [row.coordinates[0], row.coordinates[1]]
  }
))

const App: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className='text-center'>Map Example</h1>
        <p>
          This is an interactive map that create a "mark" on it base on the items selected on the tables behind
        </p>
      </div>
      
      <Table data={data}/>
    </div>
  );
};

export default App;
