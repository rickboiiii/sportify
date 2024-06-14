"use client";

import {
    Card,
    CardColumn,
    CardFooter,
    CardHeader,
    CardImg,
    CardRow,
    CardSpan, ProgressBarBackground, ProgressBarContainer, ProgressBarForeground
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
                </>) : 'TODO: List out all their events'}
                </CardFooter>
            </Card>
        </>
    )
}