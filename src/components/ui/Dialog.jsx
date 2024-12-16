import PropTypes from 'prop-types';
import Button from './Button';
import { X } from 'lucide-react';


export default function Dialog({ isOpen, title = "", onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-4 w-1/3 relative gap-6 flex flex-col">
            <div className='flex justify-between items-center'>
                <span className='font-semibold text-xl'>{title}</span>
                <Button onClick={onClose} icon={<X size={16}/>} severity='secondary' className='!rounded-full'/>
            </div>
            <div className=''>
                {children}
            </div>
        </div>
      </div>
    );
  }

Dialog.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
}
