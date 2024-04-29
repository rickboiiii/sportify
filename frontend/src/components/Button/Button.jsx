"use client";

export default function LogInButton(onPress, children) {
    return (
        <button onClick={onPress}>{children}</button>
    )
}