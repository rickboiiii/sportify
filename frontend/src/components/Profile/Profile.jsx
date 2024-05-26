"use client";

import {
    Card,
    CardColumn,
    CardFooter,
    CardHeader,
    CardImg,
    CardRow,
    CardSpan
} from "@/components/Containers/ContainerStyled";

export default function ProfileComponent({profile, picture}) {
    /*
    * profile {
    *   first_name,
    *   middle_name,
    *   last_name,
    *
    *   date_of_birth,
    *   gender,
    *   height,
    *   weight,
    *
    *   elo,
    *   max_distance,
    *   verified,
    *   stars,
    *   id,
    *   email,
    *   username
    * }
    * */
    console.log(profile)
    return (
        <>
        <Card>
                <CardHeader>
                    <CardColumn>
                        <CardImg src={picture} alt="Users Profile Picture"/>
                    </CardColumn>
                    <CardColumn>
                        <h3>
                            <i className="fas fa-check-circle"></i>
                            {profile.first_name + ((profile.middle_name !== null && profile.middle_name !== '') ? (' (' + profile.middle_name + ') ') : ' ') + profile.last_name}
                        </h3>
                    </CardColumn>
                </CardHeader>
                <CardRow>
                    <CardSpan>
                        <h4>Informacije</h4>
                    </CardSpan>
                </CardRow>
                <CardRow>
                    <CardColumn>
                        <h3></h3>
                    </CardColumn>
                    <CardColumn>
                        <h3>Test 2</h3>
                    </CardColumn>
                    <CardColumn>
                        <h3>Test 3</h3>
                    </CardColumn>
                </CardRow>
                <CardFooter>
                    <CardColumn>
                        <CardRow>
                            <h3>Nivo Sposobnosti</h3>
                        </CardRow>
                        <CardRow>
                            **Visual Representation**
                        </CardRow>
                    </CardColumn>
                </CardFooter>
            </Card>
        </>
    )
}