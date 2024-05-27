"use client";

export default function Action({onPress, children}) {
    return (
        <button onClick={onPress}>{children}</button>
    )
}