"use client";

import SideBar from "@/components/SideBar/SideBar";
import SearchBar from "@/components/SearchBar/SearchBar";
import ProfileComponent from "@/components/Profile/Profile";
import RightBar from "@/components/SideBar/RightBar";
import {SideBarHeader, SideBarTile} from "@/components/SideBar/SideBarStyled";
import {Card, CardImg} from "@/components/Containers/ContainerStyled";


export function Profile({type, profile, defaultSearchUrl, searchUrl, stock_pic, mode = "view"}) {
    return (
        <div style={{display: "flex"}}>
            <SideBar />
            <div style={{margin: "2rem 0"}}>
                <SearchBar default_search_url={defaultSearchUrl} search_url={searchUrl} type="profiles"/>
                <ProfileComponent type={type} profile={profile} picture={profile.picture ?? stock_pic} mode={mode}/>
            </div>
            <RightBar>
                <SideBarHeader className="header">
                    <i className="fas fa-people-group"></i>
                    <p>Preporuceni prijatelji</p>
                </SideBarHeader>
                <SideBarTile href="/profiles/">
                    <Card className="card-ghost-white">
                        <CardImg src={stock_pic} alt="Users Profile Picture"/>
                        <h5>Test Name</h5>
                    </Card>
                </SideBarTile>
            </RightBar>
        </div>
    );
}