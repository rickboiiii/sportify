

import {Card, CardHeader, CardRow, Container} from "@/components/Containers/ContainerStyled";
import ProfileComponent from "@/components/Profile/Profile";
import axios from "axios";
import {Suspense} from "react";
import Loading from "@/app/profiles/[type]/id/[id]/loading";
import {taupeGrayLight} from "@/styles/GlobalStyle";

export default async function Profile(props) {

    const params = props.params;
    const stock_pic = '/blank_profile_picture.png';

    try {
        const res = await axios.get('http://127.0.0.1:8000/profiles/' + params.type + '/username/' + params.username);
        let profile = {}

        if(params.type === 'igraci') {
            profile = {
                 first_name: res.data.ime_igraca,
                 middle_name: res.data.srednje_ime,
                 last_name: res.data.prezime_igraca,
                 date_of_birth: res.data.datum_rodjenja,
                 gender: res.data.spol,
                 height: res.data.visina,
                 weight: res.data.tezina,
                 elo: res.data.nivo_sposobnosti,
                 max_distance: res.data.max_dozvoljena_udaljenost,
                 verified: res.data.verifikovan,
                 stars: res.data.recenzija,
                 id: res.data.id_igraca,
                 email: res.data.korisnici.email,
                 username: res.data.korisnici.korisnicko_ime
            };
        } else if(params.type === 'vlasnici') {
            profile = {
                 first_name: res.data.ime_vlasnika,
                 middle_name: res.data.srednje_ime,
                 last_name: res.data.prezime_vlasnika,
                 date_of_birth: res.data.datum_rodjenja,
                 gender: res.data.spol,
                 stars: res.data.recenzija,
                 id: res.data.id_vlasnika,
                 email: res.data.korisnici.email,
                 username: res.data.korisnici.korisnicko_ime
            };
        }

        return (
            <Container>
                <Suspense fallback={<Loading />}>
                    <ProfileComponent type={params.type} profile={profile} picture={stock_pic} />
                </Suspense>
            </Container>
        );
    } catch (e) {
        if(e.response.status === 404) {
            return (
                <Container>
                    <Card>
                        <CardHeader>
                            <h1>{e.response.data.detail} <i className="fas fa-question" style={{fontSize: "4rem", color: taupeGrayLight}}></i></h1>
                        </CardHeader>
                        <CardRow>
                            <p>
                                Izgleda da ste zalutali, <a href="/">nazad na pocetnu
                                    <i className="fas fa-arrow-rotate-back" style={{color: "#551A8B"}}></i>
                                </a>
                            </p>
                        </CardRow>
                    </Card>
                </Container>
            );
        }
    }
}
