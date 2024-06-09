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
import SideBar from "@/components/SideBar/SideBar";

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

    if(type === 'igraci') {

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

    return (
        <>
            <SideBar/>
        <Card>
            <CardHeader>
                <CardColumn>
                    <CardImg src={picture} alt="Users Profile Picture"/>
                </CardColumn>
                <CardColumn>
                    <h3 style={{marginBottom: 0}}>
                        {(profile.verified) ? (<i className="fas fa-check-circle"></i>) : ''}
                        {profile.first_name + ((profile.middle_name !== null && profile.middle_name !== '') ? (' (' + profile.middle_name + ') ') : ' ') + profile.last_name}
                    </h3>
                    <p style={{margin: 0}}>
                        {profile.email}<br />
                        {profile.username}#{profile.id}
                    </p>
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
                    <h5>{new Date(profile.date_of_birth).toLocaleDateString()}</h5>
                </CardColumn>
                <CardColumn>
                    <h4><i className="fas fa-venus-mars"></i>Spol</h4>
                    <h5>{(profile.gender) ? "Musko" : "Zensko"}</h5>
                </CardColumn>
                {(type === 'igraci') ? (<>
                <CardColumn>
                    <h4><i className="fas fa-ruler"></i>Visina</h4>
                    <h5>{profile.height} cm</h5>
                </CardColumn>
                <CardColumn>
                    <h4><i className="fas fa-weight-scale"></i>Tezina</h4>
                    <h5>{profile.weight} kg</h5>
                </CardColumn>
                <CardColumn>
                    <h4><i className="fas fa-people-arrows"></i>Max udaljenost</h4>
                    <h5>{profile.max_distance} km</h5>
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