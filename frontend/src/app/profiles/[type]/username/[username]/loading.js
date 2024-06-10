import {LoadingBackground} from "@/components/Containers/ContainerStyled";

export default function Loading() {
    return (
        <LoadingBackground>
            <i className="fas fa-spinner"></i>
        </LoadingBackground>
    );
}