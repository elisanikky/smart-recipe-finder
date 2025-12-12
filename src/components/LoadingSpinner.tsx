import React from "react";

interface LoadingSpinnerProps {
    message?: string;
    size?: "small" | "medium" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = "Loading...",
    size = "medium"
}) => {
    const sizeClasses = {
        small: "spinner-small",
        medium: "spinner-medium",
        large: "spinner-large"
    };

    return (
        <div className="loading-container">
            <div className={`spinner ${sizeClasses[size]}`}></div>
            <p className="loading-message">{message}</p>
        </div>
    );
};
