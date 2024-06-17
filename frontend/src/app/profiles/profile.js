"use client";

import SideBar from "@/components/SideBar/SideBar";
import SearchBar from "@/components/SearchBar/SearchBar";
import ProfileComponent from "@/components/Profile/Profile";
import RightBar from "@/components/SideBar/RightBar";
import {SideBarHeader, SideBarTile} from "@/components/SideBar/SideBarStyled";
import {Buffer, Card, CardImg} from "@/components/Containers/ContainerStyled";
import SuggestedForYou from "@/components/SuggestedForYou/SuggestedForYou";


export function Profile({type, profile, friends, timetable, recommendedFriends = [{index: 1, username: "test", fullname: "Testing"}], defaultSearchUrl, searchUrl, stock_pic, mode = "view"}) {
    return (
        <div style={{display: "flex"}}>
            <SideBar />
            <Buffer />
            <div style={{margin: "2rem 0", flex: 1}}>
                <SearchBar default_search_url={defaultSearchUrl} search_url={searchUrl} type="profiles"/>
                <ProfileComponent type={type} profile={profile} picture={profile.picture ?? stock_pic} mode={mode}/>
            </div>
            <RightBar>
                <SideBarHeader>
                    <i className="fas fa-people-group"></i>
                    <h2>Preporuceni prijatelji</h2>
                </SideBarHeader>
                <SideBarTile href="/profiles/">
                    <Card className="card-ghost-white border">
                        <CardImg src={stock_pic} alt="Users Profile Picture"/>
                        <h5>Test Name</h5>
                    </Card>
                </SideBarTile>
                <SideBarTile href="/profiles/">
                    <Card className="card-ghost-white border">
                        <CardImg src={stock_pic} alt="Users Profile Picture"/>
                        <h5>Test Name</h5>
                    </Card>
                </SideBarTile>
            </RightBar>
        </div>
    );
}