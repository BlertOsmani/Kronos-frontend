import PropTypes from 'prop-types';
import Tag from '../ui/Tag';
import { CalendarDays, Ellipsis } from 'lucide-react';
import Button from '../ui/Button';
import { useDialog } from '../../contexts/DialogProvider';
import {format} from 'date-fns';
import { useState } from 'react';
import TieredMenu from '../ui/TieredMenu';
import { statuses } from '../../utils/constants';

export default function TaskCard({id, due_date, status, title = "", description = "", priority="High", onEdit}){
    const {openDialog} = useDialog();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const severity = {
        High: 'error',
        Normal: 'info',
        Low: 'success'
    }

    const taskData = {
        id,
        title,
        description,
        status,
        priority,
        due_date,
    }

    const menuItems = [
        {
            label: 'Move to',
            children: statuses
                    .filter((item) => item !== status)
                    .map((item) => ({
                        label: item,
                        onClick: () => onEdit(id, {...taskData, status: item}),
                    })),
        },
        { label: 'Delete', onClick: async () => openDialog('delete_task', {title: 'Delete confirmation', data: id}), className: 'hover:bg-red-50 !text-red-500' },
      ];

  return (
    <Button type={'button'} onClick={() => openDialog("add_or_update_task", {title: `Edit task #${id}`, data: taskData})} severity='white' childrenContainerClassName={'text-start'} className='!p-0 hover:shadow hover:!bg-white'>
        <div className='border w-full p-2 gap-2 flex flex-col rounded justify-between items-start'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex relative justify-between items-center'>
                    <Tag size={'xs'} severity={severity[priority]} name={priority}/>
                    <Button className='relative' onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                         icon={<Ellipsis size={15}/>} severity='secondary' size='xs'/>
                    <TieredMenu
                        items={menuItems}
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                        className={'absolute ml-1 right-0 top-6'}
                    />
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <span className={`text-sm ${status === 'Done' ? 'line-through' : ''}`}>{title}</span>
                </div>
                <span className='text-neutral-600 text-xs font-regular'>{description}</span>
            </div>
            <div className='pt-2 flex justify-between items-center'>
                {due_date && <span className='text-xs text-neutral-600 flex gap-1'><CalendarDays size={14}/>{format(new Date(due_date), 'dd/MM/yyyy')}</span>}
            </div>
        </div>
    </Button>
  )
}

TaskCard.propTypes = {
    id: PropTypes.number,
    tagSeverity: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    due_date: PropTypes.string,
    status: PropTypes.string,
    onEdit: PropTypes.func
}
