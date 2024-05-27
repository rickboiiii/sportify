"use client"
import ResponsiveExample from "@/components/Tables/TabelaIgraca";
import axios from "axios";
import { useEffect, useState } from "react";
function Tabela(){
    const [id, setId]=useState(1);
    const [brojIgraca, setBrojIgraca]=useState(3)
    const [brojEkipa, setBrojEkipa]=useState(3)
    const [data, setData]=useState([])
    const [ekipe, setEkipe]=useState([])
    useEffect(  ()=>{
        const uzmi=()=>{
             axios.get(`http://localhost:8000/dajNajboljePoSportu/${id}/${brojIgraca}`).then(response=>setData(response)).catch(err=>console.log(err))
        }
        uzmi();
    }, [id, brojIgraca] )
    useEffect(  ()=>{
        const uzmi=()=>{
             axios.get(`http://localhost:8000/dajNajboljeEkipePoSportu/${id}/${brojEkipa}`).then(response=>setEkipe(response)).catch(err=>console.log(err))
        }
        uzmi();
    }, [id, brojEkipa])
    console.log(data)
    console.log(ekipe)


//<ResponsiveExample props={data}></ResponsiveExample>
    return (<>

        <form>
            <select
             value={brojIgraca}
             onChange={(e)=>setBrojIgraca(e.target.value)}
             
             > 
             <option value={3}>Top 3</option>
             <option value={10}>Top 10</option>
             <option value={50}>Top 50</option>
             
             
             </select>
             
        </form>
        <div>
        { data && <ResponsiveExample props={data}></ResponsiveExample>}
        </div>
        <form>
            <select
             value={brojEkipa}
             onChange={(e)=>setBrojEkipa(e.target.value)}
             
             > 
             <option value={3}>Top 3</option>
             <option value={10}>Top 10</option>
             <option value={50}>Top 50</option>
             
             
             </select>
        </form>
        <div>
        {ekipe &&<ResponsiveExample props={ekipe}></ResponsiveExample>}
        </div>
    
        </>
    )
}
export default Tabela;