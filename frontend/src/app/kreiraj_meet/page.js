
import KreiranjeMeetaClient from "@/app/kreiraj_meet/meet";
import axios from "axios";

async function getSports() {
  try {
     let sportovi = [];

      const res = await axios.get('http://localhost:8000/sportovi');
        res.data.map((sport) => {
            sportovi.push({
              id: sport.id_sporta,
              name: sport.naziv_sporta
            })
          })

      return sportovi;

  } catch (error) {
    console.error('Error:', error)
  }
}

async function getLocations() {
    try {
     let lokacije = [];

      const res = await axios.get('http://localhost:8000/all-locations');
        res.data.map((lokacija) => {
            lokacije.push({
              id: lokacija.id_lokacije,
              name: lokacija.naziv_lokacije
            })
          })

      return lokacije;

  } catch (error) {
    console.error('Error:', error)
  }
}

export default async function KreiranjeMeeta() {

  const sports = await getSports();
  const locations = await getLocations();

  return (
      <KreiranjeMeetaClient sports={sports} locations={locations}/>
  );
}