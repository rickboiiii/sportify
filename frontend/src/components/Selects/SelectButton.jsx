"use client";

import React from 'react';
import { StyledSelect } from '../Selects/SelectStyled'; // Proveri putanju

export default function SelectButton({ id, name, options }) {
    return (
        <StyledSelect id={id} name={name}>
            <option value=""></option>
            {options && options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </StyledSelect>
    );
}
