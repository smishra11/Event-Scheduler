'use client';

import React, { useState } from 'react';
import MyFullCalendar from './MyCalender';
import EventDetails from './EventDetails';

import moment from 'moment';
import CreateEventDialog from './CreateEventDialog';
import Sidebar from './Sidebar';

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
      <div className='block md:flex'>
        <Sidebar
          handleCreateBtn={handleCreateBtn}
          allEvents={allEvents}
          handleEdit={handleEdit}
          handleEventDelete={handleEventDelete}
        />
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
