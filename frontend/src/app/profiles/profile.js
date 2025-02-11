"use client";

import SideBar from "@/components/SideBar/SideBar";
import SearchBar from "@/components/SearchBar/SearchBar";
import ProfileComponent from "@/components/Profile/Profile";
import RightBar from "@/components/SideBar/RightBar";
import {SideBarHeader, SideBarTile} from "@/components/SideBar/SideBarStyled";
import {Buffer, Card, CardImg} from "@/components/Containers/ContainerStyled";
import {useEffect, useState} from "react";


export function Profile({type, profile, friends, timetable, recommendedFriends, fields, events, defaultSearchUrl, searchUrl, stock_pic, mode = "view"}) {

    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setUsername(JSON.parse(atob(parsedToken.access_token.split('.')[1])).sub);
        }
    }, [username]);

    if(username === profile.username) mode = "edit";

    let recommended_friends = [];
    recommendedFriends && recommendedFriends.map((friend) => {
        let visit_url = "#"
        if(friend.user_type !== "others")
            visit_url = "/profiles/" + friend.user_type + "/id/" + friend.user_id;

        recommended_friends.push(
        <SideBarTile key={friend.user_id} href={visit_url}>
            <Card className="card-ghost-white border">
                <CardImg src={friend.picture_data ?? stock_pic} alt="Users Profile Picture"/>
                <h5>@{friend.username}</h5>
            </Card>
        </SideBarTile>
    )});

    return (
        <div style={{display: "flex"}}>
            <SideBar />
            <Buffer />
            <div style={{margin: "2rem 0", flex: 1}}>
                <SearchBar default_search_url={defaultSearchUrl} search_url={searchUrl} type="profiles"/>
                <ProfileComponent type={type} profile={profile} friends={friends} timetable={timetable} fields={fields} events={events} picture={profile.picture ?? stock_pic} userMode={mode}/>
            </div>
            <RightBar>
                <SideBarHeader>
                    <i className="fas fa-people-group"></i>
                    <h2>Preporuceni prijatelji</h2>
                </SideBarHeader>
                {(recommended_friends.length !== 0) ? (recommended_friends) : (<p>Nemamo preporuka <i className="fas fa-smile"></i></p>)}
            </RightBar>
        </div>
    );
}