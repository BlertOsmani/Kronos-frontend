import PropTypes from 'prop-types';
import Button from './Button';
import { X } from 'lucide-react';

export default function ConfirmDialog({ confirmButtonSeverity, isOpen, title = "", message = "", onClose, onConfirm, confirmButtonText, rejectButtonText }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-1/4 relative gap-4 flex flex-col">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{title}</span>
                <Button onClick={onClose} icon={<X size={16} />} severity="secondary" className="!rounded-full" />
            </div>
            
            {/* Message Section */}
            <div className="text-gray-600 text-sm mt-2">
                {message}
            </div>

            {/* Footer with Actions */}
            <div className="flex justify-end w-full gap-3 mt-4">
                <div className='flex gap-3 w-1/2 items-center'>
                    <Button className='w-1/2 flex justify-center' onClick={onClose} severity="secondary">
                        {rejectButtonText}
                    </Button>
                    <Button className='w-1/2 flex justify-center' onClick={onConfirm} severity={confirmButtonSeverity}>
                        {confirmButtonText}
                    </Button>
                </div>
            </div>
        </div>
      </div>
    );
}

ConfirmDialog.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    message: PropTypes.string,
    rejectButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    confirmButtonSeverity: PropTypes.oneOf(['success', 'error', 'secondary', 'primary', 'white'])
};
