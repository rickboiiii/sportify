import {SelectMaskedStyled} from "@/components/Inputs/InputStyled";
import {useState} from "react";


export default function SelectMasked({children, props, values, mode = "view"}) {

    if(props.defaultValue === undefined)
        props.defaultValue = "";

    const [value, setValue] = useState(props.defaultValue);

    return (
        <>
            {
                (mode === "view") ?
                (<>{children}</>) :
                (<SelectMaskedStyled {...props} defaultValue={props.defaultValue}>
                    {values.map((value) => (
                        <option value={value.id} key={value.id}>{value.name}</option>
                    ))}
                </SelectMaskedStyled>)
            }
        </>
    );
}