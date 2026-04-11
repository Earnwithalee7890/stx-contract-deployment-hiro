import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EventRegistrationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl max-w-md w-full shadow-2xl animate-slide-up">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Register for April Event</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    By registering, you agree to the Talent Event rules and guidelines. Your progress will be tracked on the global leaderboard.
                </p>
                <div className="flex gap-4">
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Confirm Registration
                    </button>
                </div>
            </div>
        </div>
    );
};
