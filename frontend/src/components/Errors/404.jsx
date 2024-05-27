import {Card, CardHeader, CardRow, Container, ContainerOld} from "@/components/Containers/ContainerStyled";
import {taupeGrayLight} from "@/styles/GlobalStyle";

export default function Error404({message}) {
    return (
        <ContainerOld>
            <Card>
                <CardHeader>
                    <h1>{message} <i className="fas fa-question" style={{fontSize: "4rem", color: taupeGrayLight}}></i></h1>
                </CardHeader>
                <CardRow>
                    <p>
                        Izgleda da ste zalutali, <a href="/">nazad na pocetnu
                            <i className="fas fa-arrow-rotate-back" style={{color: "#551A8B"}}></i>
                        </a>
                    </p>
                </CardRow>
            </Card>
        </ContainerOld>
    );
}