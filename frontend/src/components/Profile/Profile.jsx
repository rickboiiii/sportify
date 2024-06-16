"use client";

import {
    Card,
    CardColumn,
    CardFooter,
    CardHeader,
    CardImg,
    CardRow,
    CardSpan,
    Grid,
    GridItem,
    GridItemBody, GridItemFooter,
    GridItemHeader,
    ProgressBarBackground,
    ProgressBarContainer,
    ProgressBarForeground
} from "@/components/Containers/ContainerStyled";
import {taupeGrayLight} from "@/styles/GlobalStyle";
import UploadComponent from "@/components/Upload/Upload";
import {useEffect, useState} from "react";
import {Button} from "@/components/Button/ButtonStyled";
import axios from "axios";
import InputMasked from "@/components/Inputs/InputMasked";
import SelectMasked from "@/components/Inputs/SelectMasked";

export default function ProfileComponent({type, profile, picture}) {

    let starsList = [];
    for(let i = 1; i <= 5; i++) {
        if(i <= profile.stars) {
            starsList.push(<i className="fas fa-star" key={i}></i>)
        } else {
            starsList.push(<i className="fas fa-star" key={i} style={{color: taupeGrayLight}}></i>)
        }
    }

    let calendar = [];
    let friendsList = [];
    let eventsList = [];
    let upload_url;

    const [profilePicture, setProfilePicture] = useState(picture);
    const [mode, setMode] = useState("view")

    const onClick = () => {
        if(mode === "view")
            setMode("edit");
        else
            setMode("view");
        console.log("Edit mode on");
    }

    if(type === 'igraci') {

        upload_url = "http://127.0.0.1:8000/profiles/igraci/upload_picture";

        const weekdays = [
            "Nedjelja",
            "Ponedjeljak",
            "Utorak",
            "Srijeda",
            "Četvrtak",
            "Petak",
            "Subota"
        ]
        const currentDate = new Date();
        let otherDate = new Date();
        let currentDay = currentDate.getDay();
        for(let i = 0; i <= 6; i++) {
            if(i === currentDay) {
                calendar.push(
                    <GridItem key={i}>
                        <GridItemHeader className="active">
                            {weekdays[i]}
                        </GridItemHeader>
                        <GridItemBody>
                            <h6>17:00 - Basketball</h6>
                            <h6>21:00 - Football</h6>
                        </GridItemBody>
                        <GridItemFooter className="active">
                            {currentDate.toLocaleDateString()}
                        </GridItemFooter>
                    </GridItem>
                )
            } else {
                calendar.push(
                    <GridItem key={i}>
                        <GridItemHeader>
                            {weekdays[i]}
                        </GridItemHeader>
                        <GridItemBody>
                            <h6>17:00 - Basketball</h6>
                            <h6>21:00 - Football</h6>
                        </GridItemBody>
                        <GridItemFooter>
                            {new Date(otherDate.setDate(currentDate.getDate() + (i - currentDay))).toLocaleDateString()}
                        </GridItemFooter>
                    </GridItem>
                )
            }
        }
        for(let i = 1; i <= 5; i++) {
            friendsList.push(
                <GridItem key={i} style={{display: "flex", justifyContent: "center", textAlign: "center", border: 0}}>
                    <Card>
                        <CardImg src={picture} alt="Users Profile Picture"/>
                        <h5>Test Name {i}</h5>
                    </Card>
                </GridItem>
            );
        }

    } else {

        upload_url = "http://127.0.0.1:8000/profiles/vlasnici/upload_picture";

        for(let i = 1; i <= 5; i++) {
            eventsList.push(
                <GridItem key={i} style={{display: "flex", justifyContent: "center", textAlign: "center", border: 0}}>
                    <Card>
                        <CardImg src={picture} alt="Event Picture" className="event-img"/>
                        <h5>Test Event {i} TODO</h5>
                    </Card>
                </GridItem>
            );
        }
    }

    const saveData = () => {
        const full_name = document.getElementById("fullName").value.split(" ", 3);
        const first_name = full_name[0];
        const middle_name = (full_name[1][0] === "(") ? (full_name[1].replace("(", "").replace(")", "")) : null;
        const last_name = (full_name.length > 2) ? full_name[2] : (full_name[1].replace("(", "").replace(")", ""));
        const date_of_birth = document.getElementById("dateOfBirth").value;
        const gender = document.getElementById("gender").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;
        const max_distance = document.getElementById("maxDistance").value;

        const data = {
            ime_igraca: first_name,
            prezime_igraca: last_name,
            srednje_ime: middle_name,
            datum_rodjenja: date_of_birth,
            spol: gender,
            visina: height,
            tezina: weight,
            max_dozvoljena_udaljenost: max_distance,
        }

        if(mode === "edit")
            axios.put("http://localhost:8000/profiles/igraci/id/" + profile.id, data);
    }


    return (
        <>
        <Card>
            <CardHeader>
                <CardColumn style={{position: "relative"}}>
                    <CardImg src={profilePicture} alt="Users Profile Picture" id="userProfileImage"/>
                    {/* Should be chacked if the user is logged in and its their profile */}
                    {(mode === "edit") && (<UploadComponent id={profile.id} upload_url={upload_url} className="position-absolute" stateChanger={setProfilePicture} />)}
                </CardColumn>
                <CardColumn>
                    <h3 style={{marginBottom: 0, textAlign: "right"}}>
                        {(profile.verified) ? (<i className="fas fa-check-circle"></i>) : ''}
                        <InputMasked props={{type:"text", name:"full_name", id:"fullName", placeholder:"Ime (Srednje Ime) Prezime", onInput:saveData, defaultValue: profile.first_name + ((profile.middle_name !== null && profile.middle_name !== '') ? (' (' + profile.middle_name + ') ') : ' ') + profile.last_name}} mode={mode}>
                            {profile.first_name + ((profile.middle_name !== null && profile.middle_name !== '') ? (' (' + profile.middle_name + ') ') : ' ') + profile.last_name}
                        </InputMasked>
                    </h3>
                    <p style={{margin: 0}}>
                        {profile.email}<br />
                        {profile.username}#{profile.id}
                    </p>
                     {/*Same here for edit button*/}
                    <Button className="small-button" onClick={onClick}>
                        <i className="fas fa-pen"></i>
                        Uredi profile
                    </Button>
                </CardColumn>
            </CardHeader>
            <CardRow>
                <CardSpan>
                    <CardRow style={{margin: 0}}>
                        <h4 style={{marginTop: "revert"}}>Informacije</h4>
                        <div style={{alignContent: "center"}}>
                            ({(profile.stars).toFixed(1)})
                            {starsList}
                        </div>
                    </CardRow>
                </CardSpan>
            </CardRow>
            <CardRow style={{justifyContent: "space-around"}}>
                <CardColumn>
                    <h4><i className="fas fa-cake-candles"></i>Datum rodenja</h4>
                    <h5>
                        <InputMasked props={{type: "date", name: "date_of_birth", id: "dateOfBirth", onInput:saveData, defaultValue: new Date(profile.date_of_birth).toISOString().split("T", 1)[0]}} mode={mode}>
                            {new Date(profile.date_of_birth).toLocaleDateString()}
                        </InputMasked>
                        {/*{new Date(profile.date_of_birth).toLocaleDateString()}*/}
                    </h5>
                </CardColumn>
                <CardColumn>
                    <h4><i className="fas fa-venus-mars"></i>Spol</h4>
                    <h5>
                        <SelectMasked props={{name: "gender", id: "gender", onInput:saveData, defaultValue: profile.gender}} values={[{id: 1, name: "Musko"}, {id: 0, name: "Zensko"}]} mode={mode}>
                            {(profile.gender) ? "Musko" : "Zensko"}
                        </SelectMasked>
                        {/*{(profile.gender) ? "Musko" : "Zensko"}*/}
                    </h5>
                </CardColumn>
                {(type === 'igraci') ? (<>
                <CardColumn>
                    <h4><i className="fas fa-ruler"></i>Visina</h4>
                    <h5>
                        <InputMasked props={{type:"text", name:"height", id:"height", placeholder:"XXX cm", onInput:saveData, defaultValue: profile.height}} mode={mode}>
                            {profile.height}
                        </InputMasked>
                        <> cm</>
                        {/*{profile.height} cm*/}
                    </h5>
                </CardColumn>
                <CardColumn>
                    <h4><i className="fas fa-weight-scale"></i>Tezina</h4>
                    <h5>
                        <InputMasked props={{type:"text", name:"weight", id:"weight", placeholder:"XXX kg", onInput:saveData, defaultValue: profile.weight}} mode={mode}>
                            {profile.weight}
                        </InputMasked>
                        <> kg</>
                        {/*{profile.weight} kg*/}
                    </h5>
                </CardColumn>
                <CardColumn>
                    <h4><i className="fas fa-people-arrows"></i>Max udaljenost</h4>
                    <h5>
                        <InputMasked props={{type:"text", name:"max_distance", id:"maxDistance", placeholder:"XXX km", onInput:saveData, defaultValue: profile.max_distance}} mode={mode}>
                            {profile.max_distance}
                        </InputMasked>
                        <> km</>
                        {/*{profile.max_distance} km*/}
                    </h5>
                </CardColumn>
                </>) : ''}
            </CardRow>
            <CardFooter>
                {(type === 'igraci') ? (<>
                    <CardRow>
                        <h3 style={{margin: 0}}>Nivo Sposobnosti</h3>
                    </CardRow>
                    <CardRow style={{marginBottom: 0}}>
                        <CardColumn style={{padding: 0}}>
                            Pocetnik
                        </CardColumn>
                        <CardColumn style={{padding: 0}}>
                            Srednji
                        </CardColumn>
                        <CardColumn style={{padding: 0}}>
                            Profi
                        </CardColumn>
                    </CardRow>
                    <CardRow style={{marginTop: 0}}>
                        <ProgressBarContainer>
                            <ProgressBarBackground>
                                <ProgressBarForeground style={{width: profile.elo * 100 + "%"}}/>
                            </ProgressBarBackground>
                        </ProgressBarContainer>
                    </CardRow>
                    <br />
                    <CardRow>
                        <h3 style={{margin: 0}}>Timetable</h3>
                    </CardRow>
                    <CardRow style={{display: "block"}}>
                        <Grid>{calendar}</Grid>
                    </CardRow>
                    <br />
                    <CardRow>
                        <h3 style={{margin: 0}}>Prijatelji</h3>
                    </CardRow>
                    <CardRow style={{display: "block"}}>
                        <Grid>{friendsList}</Grid>
                    </CardRow>
                </>) : (<>
                    <CardRow>
                        <h3 style={{margin: 0}}>Eventi</h3>
                    </CardRow>
                    <CardRow style={{display: "block"}}>
                        <Grid>{eventsList}</Grid>
                    </CardRow>
                </>)}
                </CardFooter>
            </Card>
        </>
    )
}