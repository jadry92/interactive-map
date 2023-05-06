import React, { useState } from "react";
import Map from './Map';


interface TableProps {
  data: DataJson[];
}

function countTotal(idChecked: string[], data: DataJson[]) : number {
	const rows = data.filter(row => idChecked.includes(row.id))
	return rows.reduce((count, curr) => count + curr.count,0)
}

const Table: React.FC<TableProps> = (props) => {
  const { data } = props;
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

	const [total, setTotal] = useState<number>(0)

  const handleRowCheck = (id: string) => {
    let idChecked = []
		if (checkedRows.includes(id)) {
      idChecked = checkedRows.filter((rowId) => rowId !== id)
    } else {
			idChecked = [...checkedRows, id]
    }
		setCheckedRows(idChecked);
		setTotal(countTotal(idChecked, data))
  };

	const handleSelectAll = () => {
    const allRows = data.map((row) => row.id);
    if (checkedRows.length === allRows.length) {
      setCheckedRows([]);
			setTotal(0)
    } else {
      setCheckedRows(allRows);
			setTotal(countTotal(allRows, data))
    }
  };

  const isAllRowsSelected = checkedRows.length === data.length;

	const dataJson = data.filter(row => checkedRows.includes(row.id))

  return (
		<div>
			<Map dataJson={dataJson}/>
			<p>Total Selected : {total}</p>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Location</th>
						<th scope="col">Count</th>
						<th scope="col">
							<button onClick={handleSelectAll} className="btn btn-outline-primary">
								{isAllRowsSelected ? "Unselect All" : "Select All"}
							</button>
          	</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.location}</td>
							<td>{item.count}</td>
							<td>
								<input
									type="checkbox"
									checked={checkedRows.includes(item.id)}
									onChange={() => handleRowCheck(item.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
  );
}

export default Table;
