"use client";

export default function Button(onPress, children) {
    return (
        <button onClick={onPress}>{children}</button>
    )
}