import React from 'react';
import { Button } from './ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface EventType {
  title: string;
  description: string;
  date: string;
}

function Sidebar({
  handleCreateBtn,
  allEvents,
  handleEdit,
  handleEventDelete,
}: {
  handleCreateBtn: () => void;
  allEvents: EventType[];
  handleEdit: (data: EventType) => void;
  handleEventDelete: (data: EventType) => void;
}) {
  return (
    <div className='w-[200px] p-3'>
      <div className='flex justify-center'>
        <Button
          className='rounded-full w-[140px] py-6 flex justify-center items-center bg-white hover:bg-[#eee]'
          style={{
            boxShadow:
              '3px 3px 5px rgba(0, 0, 0, 0.2),-3px 3px 5px rgba(0, 0, 0, 0.2);',
          }}
          onClick={handleCreateBtn}
        >
          <Plus size={30} color='blue' />
          <span className='font-bold ml-2 text-black'>Create</span>
        </Button>
      </div>
      <p className='text-sm font-semibold mt-8 mb-3 text-gray-600'>My Events</p>
      <div>
        {allEvents && allEvents.length ? (
          allEvents.map((data: any, i: number) => (
            <div
              className='flex items-baseline border rounded p-2 mb-2'
              key={i}
            >
              <span className='bg-blue-600 h-2 w-2 rounded-full mr-2'></span>
              <div className='flex justify-between w-full'>
                <div className='text-xs'>
                  <p>{data.date}</p>
                  <p className='text-gray-500'>{data.title}</p>
                </div>
                <div className='flex flex-col'>
                  <Button
                    className='p-0 h-auto bg-transparent hover:bg-transparent mb-2'
                    onClick={() => handleEdit(data)}
                  >
                    <Pencil size={12} color='blue' />
                  </Button>
                  <Button
                    className='p-0 h-auto bg-transparent hover:bg-transparent'
                    onClick={() => handleEventDelete(data)}
                  >
                    <Trash2 size={12} color='red' />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-red-600 text-xs mt-10 text-center'>No data</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
