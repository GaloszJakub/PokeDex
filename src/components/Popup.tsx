interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
    if (!isOpen) return null;

    const handleInnerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed  inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-10  " onClick={onClose}>
            <div
                className="bg-background p-6 rounded-lg shadow-lg relative max-w-md w-full max-h-[90vh] mx-4 z-20 overflow-y-auto hide-scrollbar"
                onClick={handleInnerClick}
            >
                
                {children}
            </div>
        </div>
    );
}
