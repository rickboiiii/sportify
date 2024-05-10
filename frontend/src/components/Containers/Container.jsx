"use client";

export default function Container(props, children) {
    return (
        <div {...props}>{children}</div>
    )
}