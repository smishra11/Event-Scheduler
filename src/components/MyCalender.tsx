import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Event {
  title: string;
  date: string;
}

const MyFullCalendar = ({
  handleDateClick,
  handleEventClick,
  allEvents,
}: {
  handleDateClick: (val: any) => void;
  handleEventClick: (val: any) => void;
  allEvents: Event[];
}) => {
  return (
    <div className='p-2'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden h-full'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          editable
          selectable
          events={allEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          // style={{ height: '100vh' }} // Full height adjustment
        />
      </div>
    </div>
  );
};

export default MyFullCalendar;
