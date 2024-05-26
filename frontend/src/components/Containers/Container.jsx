"use client";

export default function Container(props) {
    return (
        <div {...props}>{props.children}</div>
    );
}