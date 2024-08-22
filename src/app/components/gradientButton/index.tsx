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
            className={`text-white bg-gradient-to-br from-purple-400 via-blue-700 to-white-200 px-4 py-2 hover:bg-gradient-to-bl font-medium  text-sm font-medium rounded-2xl text-sm px-5 py-2.5 text-center select-none	 ${className}`}
        >
            {text}
        </button>
    );
};

export default GradientButton;
