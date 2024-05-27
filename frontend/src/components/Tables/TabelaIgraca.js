import Table from 'react-bootstrap/Table';
// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// // Table Header
// const TableHeader = styled.th`
//   background-color: #f2f2f2;
//   padding: 8px;
//   text-align: left;
// `;

// // Table Body
// const TableData = styled.td`
//   border-bottom: 1px solid #ddd;
//   padding: 8px;
// `;

// // Alternate Row Color
// const TableRowEven = styled.tr`
//   background-color: #f9f9f9;
// `;

// // Hover Effect
// const TableRowHover = styled.tr`
//   &:hover {
//     background-color: #e9e9e9;
//   }
// `;

function ResponsiveExample({props}) {
    console.log(props)
    const data=props.data ? props.data.map((sportista, indeks)=>
        <tr>
            <th>{indeks+1}</th>
            <th>{sportista.ime}</th>
            {sportista.prezime && <th>{sportista.prezime}</th>}
            <th>{sportista.naziv_sporta}</th>
            {sportista.rating ? <th>{sportista.rating}</th>: <th>{sportista.winrate}</th>}
        </tr> 
    ) : <p></p>

  return (
    <div>
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Ime</th>
          {props.data && props.data[0].rating &&<th>Prezime</th>}
          <th>Sport</th>
          <th>{props.data && props.data[0].rating  ? "Rating" : "Winrate"}</th>
        </tr>
      </thead>
      <tbody>
       {data}
      </tbody>
    </Table>
    </div>
  );
}

export default ResponsiveExample; 