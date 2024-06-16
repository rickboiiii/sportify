import {SideBarStyled} from "@/components/SideBar/SideBarStyled";


export default function RightBar({children}) {

    return (
        <SideBarStyled>
            {children}
        </SideBarStyled>
    );
}