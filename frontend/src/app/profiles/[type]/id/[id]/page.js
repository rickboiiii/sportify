import axios from "axios";
import {Suspense} from "react";
import Loading from "@/app/profiles/[type]/id/[id]/loading";
import Error404 from "@/components/Errors/404";
import {Profile} from "@/app/profiles/profile";

export default async function ProfilePage(props) {

    const params = props.params;
    const stock_pic = '/profile_picture_cute_nejra.jpg';
    const searchUrl = "http://127.0.0.1:8000/profiles/username/";
    const defaultSearchUrl = "http://127.0.0.1:8000/profiles/";

    try {
        const res = await axios.get('http://127.0.0.1:8000/profiles/' + params.type + '/id/' + params.id);
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
                picture: res.data.picture_data,
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
                picture: res.data.picture_data,
                id: res.data.id_vlasnika,
                email: res.data.korisnici.email,
                username: res.data.korisnici.korisnicko_ime
            };
        }

        const friends_res = await axios.get('http://127.0.0.1:8000/profiles/prijatelji/id/' + params.id);
        const recommended_friends_res = await axios.get('http://127.0.0.1:8000/profiles/recommended_prijatelji/id/' + params.id);

        return (
            <Suspense fallback={<Loading />}>
                <Profile type={params.type} profile={profile} friends={friends_res.data.friends} timetable={[]} recommendedFriends={recommended_friends_res.data.friends} stock_pic={stock_pic} searchUrl={searchUrl} defaultSearchUrl={defaultSearchUrl} />
            </Suspense>
        );
    } catch (e) {
        if(e.response !== undefined && e.response.status === 404) {
            return (
                <Error404 message={e.response.data.detail}/>
            );
        }
    }
}
