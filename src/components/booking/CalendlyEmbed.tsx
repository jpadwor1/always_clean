'use client'
import React, { useEffect } from "react";

interface CalendlyProps {
    url: string;
}

const CalendlyEmbed = ({ url }: CalendlyProps) => {
    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute(
            "src",
            "https://assets.calendly.com/assets/external/widget.js"
        );
        head!!.appendChild(script);
    }, []);

    return (
        <div
            className="calendly-inline-widget bg-white"
            data-url={url}
            style={{ minWidth: "320px", height: "700px" }}
        ></div>
    );
};

export default CalendlyEmbed;