import {InputMaskedStyled} from "@/components/Inputs/InputStyled";
import {useState} from "react";


export default function InputMasked({children, props, mode = "view"}) {

    if(props.defaultValue === undefined)
        props.defaultValue = "";

    const [value, setValue] = useState(props.defaultValue);

    return (
        <>
            {
                (mode === "view") ?
                (<>{children}</>) :
                (<InputMaskedStyled
                    {...props}
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={value}
                    style={{ width: (Math.min(Math.max(value.length, 2), 50) + 0.5) + 'ch' }}
                />)
            }
        </>
    );
}