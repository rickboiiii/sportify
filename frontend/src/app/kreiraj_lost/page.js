
import KreiranjeLostaClient from "@/app/kreiraj_lost/lost";
import axios from "axios";

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

export default async function KreiranjeLosta() {

  const locations = await getLocations();

  return (
      <KreiranjeLostaClient locations={locations} />
  );
}

         

