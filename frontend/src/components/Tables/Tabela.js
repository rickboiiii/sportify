import React, { useEffect, useState } from 'react';
import ResponsiveExample from "@/components/Tables/TabelaIgraca";
import axios from "axios";
import './Tabela.css'; // Import the CSS file

function Tabela() {
    const [id, setId] = useState(1);
    const [brojIgraca, setBrojIgraca] = useState(3);
    const [brojEkipa, setBrojEkipa] = useState(3);
    const [data, setData] = useState([]);
    const [ekipe, setEkipe] = useState([]);

    useEffect(() => {
        const uzmi = () => {
            axios.get(`http://localhost:8000/dajNajboljePoSportu/${id}/${brojIgraca}`)
                .then(response => setData(response.data))
                .catch(err => console.log(err));
        };
        uzmi();
    }, [id, brojIgraca]);

    useEffect(() => {
        const uzmi = () => {
            axios.get(`http://localhost:8000/dajNajboljeEkipePoSportu/${id}/${brojEkipa}`)
                .then(response => setEkipe(response.data))
                .catch(err => console.log(err));
        };
        uzmi();
    }, [id, brojEkipa]);

    return (
        <>
            <h1>Score Board</h1>
            <form className="form-control">
                <label>Top Players:</label>
                <select
                    value={brojIgraca}
                    onChange={(e) => setBrojIgraca(e.target.value)}
                >
                    <option value={3}>Top 3</option>
                    <option value={10}>Top 10</option>
                    <option value={50}>Top 50</option>
                </select>
            </form>
            <div>
                {data && <ResponsiveExample props={data}/>}
            </div>
            <form className="form-control">
                <label>Top Teams:</label>
                <select
                    value={brojEkipa}
                    onChange={(e) => setBrojEkipa(e.target.value)}
                >
                    <option value={3}>Top 3</option>
                    <option value={10}>Top 10</option>
                    <option value={50}>Top 50</option>
                </select>
            </form>
            <div>
                {ekipe && <ResponsiveExample props={ekipe}/>}
            </div>
        </>
    );
}

export default Tabela;
