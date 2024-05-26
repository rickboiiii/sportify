// "use client";

import {Container} from "@/components/Containers/ContainerStyled";
import ProfileComponent from "@/components/Profile/Profile";
import axios from "axios";
import {Suspense} from "react";
import Loading from "@/app/profiles/[id]/loading";

export default async function Profile(props) {

    const params = props.params;
    const stock_pic = '/blank_profile_picture.png';
    const res = await axios.get('http://127.0.0.1:8000/profiles/igraci/id/' + params.id);
    const igrac = {
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

    return (
        <Container>
            <Suspense fallback={<Loading />}>
                <ProfileComponent profile={igrac} picture={stock_pic} />
            </Suspense>
        </Container>
    );
}
