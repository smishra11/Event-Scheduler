import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlignLeft, Calendar } from 'lucide-react';
import moment from 'moment';

interface Data {
  title: string;
  description?: string;
  date?: string;
  id?: string;
}

export default function EventDetails({
  clickedEventDetails,
  showEventDetails,
  setShowEventDetails,
}: {
  clickedEventDetails: Data[];
  showEventDetails: boolean;
  setShowEventDetails: (val: boolean) => void;
}) {
  return (
    <Dialog
      open={showEventDetails}
      onOpenChange={() => setShowEventDetails(!showEventDetails)}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <div className='py-4'>
          {clickedEventDetails?.map((event: Data) => (
            <div
              className={`flex items-baseline ${
                clickedEventDetails.length > 1 ? 'mb-5' : ''
              }`}
              key={event.title}
            >
              <span className='h-4 w-4 bg-blue-600 rounded mr-5 flex-shrink-0'></span>
              <div>
                <p className='text-lg font-semibold'>{event.title}</p>
                <div className='flex mt-3'>
                  <AlignLeft color='gray' size={20} className='flex-shrink-0' />
                  <p
                    className={`ml-2 text-gray-600 ${
                      event?.description ? '' : 'line-through'
                    }`}
                  >
                    {event?.description
                      ? event.description
                      : 'No description available'}
                  </p>
                </div>
                <div className='flex items-center mt-3'>
                  <Calendar color='gray' size={20} />
                  <p className='ml-2 text-gray-600'>
                    {moment(event.date).format('dddd, MMMM DD')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
