import React from "react";

interface EmptyStateProps {
    icon?: string;
    title: string;
    message: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = "",
    title,
    message,
    action
}) => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-message">{message}</p>
            {action && <div className="empty-state-action">{action}</div>}
        </div>
    );
};
