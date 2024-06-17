import {SideBarStyled} from "@/components/SideBar/SideBarStyled";
import {ghostWhite} from "@/styles/GlobalStyle";


export default function RightBar({children}) {

    return (
        <SideBarStyled style={{marginTop: "7rem"}}>
            <div style={{display: "flex", flexDirection: "column", background: ghostWhite, width: "50%", borderRadius: "1rem", paddingBottom: "2rem"}}>
                {children}
            </div>
        </SideBarStyled>
    );
}