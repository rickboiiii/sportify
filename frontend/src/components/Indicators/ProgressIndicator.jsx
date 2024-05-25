"use client";

import {Row} from "@/components/Containers/ContainerStyled";
import {Line} from "@/components/Indicators/LineStyled";
import {Number} from "@/components/Indicators/NumberStyled";

export default function ProgressIndicator(props) {
    const active_number = (props.active_number === null || parseInt(props.active_number) < 1) ? 1 : (props.active_number > props.steps) ? props.steps : parseInt(props.active_number);
    const progress = [];

    for(let i = 1; i <= props.steps; i++) {
        if(i === active_number)
            progress.push(<Number key={i} className={"active"}>{i}</Number>);
        else
            progress.push(<Number key={i}>{i}</Number>);

        if(i >= 1 && i < props.steps)
            progress.push(<Line key={i*10} />);
    }

    return (
        <Row>{progress}</Row>
    )
};