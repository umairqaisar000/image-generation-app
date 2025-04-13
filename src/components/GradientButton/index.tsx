import React from 'react';

interface GradientButtonProps {
    onClick: (e: React.MouseEvent) => void;
    isLoading: boolean;
    text: string;
    className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    onClick,
    isLoading,
    text,
    className = '',
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isLoading}
            className={`py-3 text-white rounded-lg bg-gradient-to-r from-cosmic-purple to-cosmic-blue hover:opacity-90 transition-all font-medium shadow-[0px_0px_10px_4px] shadow-cosmic-purple/40 ${className}`}
        >
            {text}
        </button>
    );
};

export default GradientButton;
