'use client';

import React, { useState } from 'react';
import MyFullCalendar from './MyCalender';
import EventDetails from './EventDetails';
import { Button } from './ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import moment from 'moment';
import CreateEventDialog from './CreateEventDialog';

interface EventType {
  title: string;
  description: string;
  date?: string;
}

function Main() {
  const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const [clickedDate, setClickedDate] = useState('');
  const [editClicked, setEditClicked] = useState(false);
  const [editableEvent, setEditableEvent] = useState<EventType>({
    title: '',
    description: '',
    date: undefined,
  });

  const [clickedEventDetails, setClickedEventDetails] = useState([
    { title: 'Test Meeting', date: '2024-08-10', description: '' },
  ]);
  const [allEvents, setAllEvents] = useState([
    { title: 'Test Meeting', date: '2024-08-10', description: '' },
  ]);

  const handleDateClick = (arg: any) => {
    setCreateEventDialogOpen(true);
    setClickedDate(arg.date);
  };

  const handleEventClick = (clickInfo: any) => {
    // console.log(clickInfo.event.title);
    let filteredEvents = allEvents.filter(
      (data: EventType) => data.title === clickInfo.event.title
    );
    setClickedEventDetails(filteredEvents);
    console.log(filteredEvents);

    setShowEventDetails(true);
  };

  const saveEvent = (formdata: EventType) => {
    if (editClicked) {
      setAllEvents(
        allEvents.map((event) =>
          event.title === editableEvent.title &&
          event.description === editableEvent.description
            ? { ...formdata, date: moment(clickedDate).format('YYYY-MM-DD') }
            : event
        )
      );
    } else {
      setAllEvents([
        ...allEvents,
        { ...formdata, date: moment(clickedDate).format('YYYY-MM-DD') },
      ]);
    }
    setCreateEventDialogOpen(false);
    setEditClicked(false);
  };

  const handleCreateBtn = () => {
    setCreateEventDialogOpen(true);
    setClickedDate(moment().format('YYYY-MM-DD'));
  };
  const handleEdit = (data: EventType) => {
    setCreateEventDialogOpen(true);
    setClickedDate(moment(data.date).format());
    setEditClicked(true);
    setEditableEvent(data);
  };
  const handleEventDelete = (data: EventType) => {
    const filtered = allEvents.filter(
      (event) =>
        event.title !== data.title &&
        event.description !== data.description &&
        event.date !== data.date
    );
    setAllEvents(filtered);
  };

  return (
    <>
      <div className='flex'>
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
          <p className='text-sm font-semibold mt-8 mb-3 text-gray-600'>
            My Events
          </p>
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
        <div className='grow'>
          <MyFullCalendar
            handleDateClick={handleDateClick}
            handleEventClick={handleEventClick}
            allEvents={allEvents}
          />
        </div>
      </div>
      <CreateEventDialog
        createEventDialogOpen={createEventDialogOpen}
        setCreateEventDialogOpen={setCreateEventDialogOpen}
        date={clickedDate}
        saveEvent={saveEvent}
        editClicked={editClicked}
        setEditClicked={setEditClicked}
        editableEvent={editableEvent}
      />
      <EventDetails
        clickedEventDetails={clickedEventDetails}
        showEventDetails={showEventDetails}
        setShowEventDetails={setShowEventDetails}
      />
    </>
  );
}

export default Main;
