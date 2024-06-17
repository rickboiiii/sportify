import React from 'react';
import { Table } from 'react-bootstrap';
import './TabelaIgraca.css'; // Import the CSS file

function ResponsiveExample({props}) {
    let data;
    try {
        data = props.data && props.data.map((sportista, indeks) => (
            <tr key={indeks}>
                <th>{indeks + 1}</th>
                <th>{sportista.ime}</th>
                {sportista.prezime && <th>{sportista.prezime}</th>}
                <th>{sportista.naziv_sporta}</th>
                {sportista.rating ? <th>{sportista.rating}</th> : <th>{sportista.winrate}</th>}
            </tr>
        ));
    } catch (error) {
        console.error("Error processing data:", error);
        data = (
            <tr>
                <td colSpan="5">No data available</td>
            </tr>
        );
    }

    return (
        <div className="scoreboard">
            <Table responsive className="scoreboard-table">
                <thead className="scoreboard-header">
                    <tr>
                        <th>#</th>
                        <th>Ime</th>
                        {props.data && props.data[0] && props.data[0].rating && <th>Prezime</th>}
                        <th>Sport</th>
                        <th>{props.data && props.data[0] && props.data[0].rating ? "Rating" : "Winrate"}</th>
                    </tr>
                </thead>
                <tbody className="scoreboard-body">
                    {data}
                </tbody>
            </Table>
        </div>
    );
}

export default ResponsiveExample;
