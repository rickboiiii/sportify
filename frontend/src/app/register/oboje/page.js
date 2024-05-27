"use client"
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { fontSize1, fontSize2, fontSize3, fontSize4, fontSize5, pear, ghostWhite, ghostWhiteLight, fontSize6 } from '@/styles/GlobalStyle';
import { LogInButton } from "@/components/Button/ButtonStyled";
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import Quiz from '@/components/QuizCard/KarticaChat';

const Kviz = ()=>{
  return <Quiz></Quiz>
}
export default Kviz;
// const Container = styled.div`
//   display: flex;
//   flex: 1;
//   flex-direction: row;
//   flex-wrap: wrap;
//   color: ${ghostWhiteLight};
//   font-size: ${fontSize1};

//   @media (max-width: 900px) {
//     flex-direction: column-reverse;
//     font-size: ${fontSize4};
//   }
// `;
// const LeftSection = styled.div`
//   flex: 1;
//   padding: 2.5em 2em 4em 5em; 
//   justify-content: center;
//   @media (max-width: 700px) {
//     padding-top: 1em;
//     padding-left: 4em;
//     padding-bottom: 2em;
//     padding-right: 0em;
//   }
// `;

// const RightSection = styled.div`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-image: url(${props=>props.src});
//   background-size: cover;
//   background-position: center;
//   min-height:100vh;
//   @media (max-width: 985px) {
//     min-height: 15vh;
//   }
// `;
// const BackLink = styled.a`
// overflow-x: hidden;
//   display: flex;
//   color: ${ghostWhiteLight}; 
//   box-sizing: border-box;
//   align-items: center;
//   text-decoration: none;
//   margin-bottom: 1em;
//   &:hover {
//     color: ${ghostWhite}; 
//     font-weight: bold; 
//   }
// `;

// const Title = styled.p`
// overflow-x: hidden;
// box-sizing: border-box;
//   font-size: ${fontSize3};
//   font-weight: bold;
//   color: ${ghostWhite};
//   margin: 0.5em 0;
//   @media (max-width: 985px) {
//     font-size: ${fontSize6};
//   }
// `;

// const Subtitle = styled.span`
// overflow-x: hidden;
//   a {
//     color: ${pear};
//     font-weight: bold;
//     text-decoration: none;
//   }
// `;

// const Form = styled.form`
//   color: ${ghostWhite};
//   font-weight: bold;
//   letter-spacing: 0.15em;
//   margin-top: 2em;
//   overflow-x: hidden;

//   label {
//     padding-left: 0.5em;
//   }

//   input, select, checkbox {
//     font-size: ${fontSize5};
//     height: 50px;
//     border-radius: 150px;
//     border: none;
//     width: 70%;
//     padding-left: 15px;
//     box-sizing: border-box;
//     margin-bottom: 2em;
//   }

//   select {
//     border:none;
//     outline:none;
//   }
// `;

// function Register() {
//   const router = useRouter();
//   const params=useParams();
//   const {id}=params;
//   const [ime, setIme] = useState("");
//   const [prezime, setPrezime] = useState('');
//   const [srednjeIme, setSrednjeIme]=useState("");
//   const [datumRodjenja, setDatumRodjenja]=useState("");
//   const [spol, setSpol]=useState(false);
//   const [visina, setVisina]=useState(0);
//   const [tezina, setTezina]=useState(0);
//   const [udaljenost, setUdaljenost]=useState(0);
//   const [sport, setSport]=useState([])
//   const [listaMogucihSportova, setListaMogucihSportova]=useState([]);
//   const [prikazSportova, setPrikazSportova]=useState([])
//   const validateForm =  (e) => {
//     e.preventDefault();
//     if (!ime || !prezime || !visina || !tezina ) {
//       setError('Niste popunili sve potrebne informacija');
//      // return false;
//     }
// // malo vise o ruterima, tokeni i sesije i hashovanje
// // verifikacija korisnika na dugmic zatrazi verifikaciju
//     else {
//       console.log(typeof(Number(id)), Number(id));
//       console.log(typeof(ime), ime);
//       console.log(typeof(prezime), prezime);
//       console.log(typeof(srednjeIme), srednjeIme);
//       console.log(typeof(datumRodjenja), datumRodjenja);
//       console.log(typeof(spol), spol);
//       console.log(typeof(Number(visina)), Number(visina));
//       console.log(typeof(Number(tezina)), Number(tezina));
//       console.log(typeof(Number(udaljenost)), Number(udaljenost));
//       console.log(typeof(Number(sport)), Number(sport));


//           let igrac={
//               id_korisnika:Number(id),
//               ime_igraca:ime,
//               prezime_igraca:prezime,
//               srednje_ime: srednjeIme,
//               datum_rodjenja:String(datumRodjenja),
//               spol:spol,
//               visina:Number(visina),
//               tezina:Number(tezina),
//               max_dozvoljena_udaljenost:Number(udaljenost),
//               sport:Number(sport),
//               nivo_sposobnosti:"0",
//               verifikovan:false,
//               recenzija:1}

//           // }
//           // let igrac={id_korisnika: 1,
//           //   ime_igraca: 'Marko',
//           //   prezime_igraca: 'Petrović',
//           //   srednje_ime: 'Ivan',
//           //   datum_rodjenja: '1995-05-15',
//           //   spol: true, // true for male, false for female
//           //   visina: 180,
//           //   tezina: 75,
//           //   nivo_sposobnosti: 'Napredni',
//           //   max_dozvoljena_udaljenost: 20,
//           //   verifikovan: true,
//           //   recenzija: 4.5,
//           //   sport: 2
//           // };
//           axios.post(`http://localhost:8000/dodajOboje`, igrac)
//           .then(response=>router.push(`/kviz/${response.data.id_igraca}`)).catch(err=>console.log(err))
//         }
        
//   };

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/sportovi");
//       setListaMogucihSportova(response.data);
//     } catch (error) {
//       console.log(error); // Rukovanje greškom u slučaju neuspješnog dohvata
//     }
//   };

//   fetchData(); // Pozivanje funkcije za dohvat podataka
// }, []); // Prazna niz ovisnosti kako bi se hook izvršio samo prilikom montiranja komponente

// useEffect(  ()=>{
// setPrikazSportova(
//   listaMogucihSportova.map((sport, indeks) => (
    
//     <option value={indeks}>{sport.naziv_sporta} </option>
//   )))
// console.log(listaMogucihSportova)
// console.log(typeof(listaMogucihSportova))
// console.log(prikazSportova)}, [listaMogucihSportova])
// // console.log(listaMogucihSportova[0].naziv_sporta)
// // console.log(prikazSportova);
// /* ---- EDIT FOR REGISTER PURPOSES -----
//   const router = useRouter();

//   const validateForm =  () => {
//     if (!username || !password) {
//       setError('Username and password are required');
//       return false;
//     }
//     else if (password!==confirmedPassword){
//       setError("Provjerite lozinku");
//       return false;
//     }


//     }
//     else {
//       axios.get("http://localhost:8000/register/validUsername/").
//       then(response=>{
//         if (response.data>0){
//           setError("Zauzeto korisničko ime");
//           return false;
//         }
      
//     return true;
    
//       }).catch(error=>{
//         console.error("greska":error)
//       })
//     }
//     setError('');
//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;

//     const formDetails = new URLSearchParams();
//     formDetails.append('username', username);
//     formDetails.append('password', password);

//     try {
//       const response = await fetch('http://localhost:8000/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: formDetails,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         router.push('/');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.detail || 'Authentication failed!');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again later.');
//     }
//   };
//   */



//   const [error, setError] = useState('');
//   const [indeksSlike, setIndeksSlike] = useState(0);
//   const slike=[slika4, image7, slika5, slika6, slika7, slika8, slika9, slika10, slika11];
  
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setIndeksSlike((prevIndex) => (prevIndex+1)%slike.length);
//     }, 5000); // Mijenja sliku svakih 5 sekundi

//     return () => clearInterval(intervalId); // Očistite interval kad se komponenta demontira
//   },[]);

// // treba dodati mogucnost da se odabere vise sportova
//   return (
//     <Container>
//       <LeftSection>
//         <BackLink href="http://localhost:3000">
//           <Image src={left_arrow} alt="Back arrow" width={40} />
//           <span style={{ marginLeft: 15 }}>Vratite se nazad na početnu stranicu</span>
//         </BackLink>
//         <Title>Nemojte biti samo posmatrač</Title>
//         <Subtitle>
//           Kreirajte besplatan račun ili se <a href="http://localhost:3000" style={{textDecoration: 'underline'}}> prijavite na postojeći</a>
//         </Subtitle>
//         <Form autoComplete="off">
//           <div>
//             <label>Ime</label><br />
//             <input
//               type="text"
//               value={ime}
//               onChange={(e) => setIme(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
//             <label>Srednje ime</label><br />
//             <input
//               type="text"
//               value={srednjeIme}
//               onChange={(e) => setSrednjeIme(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
//             <label>Prezime</label><br />
//             <input
//               type="text"
//               value={prezime}
//               onChange={(e) => setPrezime(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
//             <label>Spol</label><br />
//             <select
//                 value={spol}
//                 onChange={e => setSpol(e.target.value)} 
//               >
//                 <option value={0}>Muškarac</option>
//                 <option value={1}>Žena</option>
                
//           </select>
//           </div>
//           <div>
//             <label>Visina</label><br />
//             <input
//               type="number"
//               value={visina}
//               onChange={(e) => setVisina(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
//             <label>Težina</label><br />
//             <input
//               type="number"
//               value={tezina}
//               onChange={(e) => setTezina(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
//             <label>Udaljenost </label><br />
//             <input
//               type="number"
//               value={udaljenost}
//               onChange={(e) => setUdaljenost(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
//             <label>Datum rođenja</label><br />
//             <input
//               type="date"
//               value={datumRodjenja}
//               onChange={(e) => setDatumRodjenja(e.target.value)}
//               autoComplete="off"
//             />
//           </div>
//           <div>
            
//             <label>Odaberite sport</label><br></br>
//           <select
//                 value={sport}
//                 onChange={e => setSport(e.target.value)} 
//               >
//                 {prikazSportova}
                
//           </select>
//     </div>
//           <LogInButton onClick={(e)=>validateForm(e)} type="submit" style={{ width: '70%' }}>Registruj se</LogInButton>
//           {error && <div className="text-danger mt-2" style={{fontSize: fontSize4}}>{error}</div>}
//         </Form>
//       </LeftSection>
//       <RightSection src={slike[indeksSlike].src}></RightSection>
//     </Container>
//   );
// }

// export default Register;


