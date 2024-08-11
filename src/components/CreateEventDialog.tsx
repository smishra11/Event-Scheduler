import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { Clock, MapPin, Users } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface Data {
  title: string;
  description: string;
  date?: string;
  id?: string;
}

export default function CreateEventDialog({
  createEventDialogOpen,
  setCreateEventDialogOpen,
  date,
  saveEvent,
  editClicked,
  setEditClicked,
  editableEvent,
}: {
  createEventDialogOpen: boolean;
  setCreateEventDialogOpen: (val: boolean) => void;
  date?: string;
  saveEvent: (formdata: Data) => void;
  editClicked: boolean;
  setEditClicked: (val: boolean) => void;
  editableEvent: Data;
}) {
  const [formdata, setFormData] = useState<Data>({
    title: editClicked ? editableEvent.title : '',
    description: editClicked ? editableEvent.description : '',
  });

  useEffect(() => {
    if (editClicked) {
      setFormData({
        title: editableEvent.title,
        description: editableEvent.description,
        date: editableEvent.date,
        id: editableEvent.id,
      });
    } else {
      setFormData({ title: '', description: '' });
    }
  }, [editClicked, editableEvent]);

  return (
    <Dialog
      open={createEventDialogOpen}
      onOpenChange={() => {
        setCreateEventDialogOpen(!createEventDialogOpen);
        setEditClicked(false);
      }}
    >
      <DialogContent className='sm:max-w-[425px] h-[90%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-left'>Schedule Event</DialogTitle>
        </DialogHeader>
        <div className='grid gap-3 py-4'>
          <div>
            <Label htmlFor='title' className='mb-1'>
              Title<span className='text-red-600 ml-1'>*</span>
            </Label>
            <Input
              id='title'
              placeholder='Add event title'
              value={formdata.title}
              onChange={(e) =>
                setFormData({ ...formdata, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor='description' className='mb-1'>
              Description
            </Label>
            <Textarea
              id='description'
              placeholder='Type your description here.'
              value={formdata.description}
              onChange={(e) =>
                setFormData({ ...formdata, description: e.target.value })
              }
            />
          </div>
          <div>
            <div className='flex items-center'>
              <Clock color='gray' size={20} />
              <p className='ml-2 font-semibold'>
                {moment(date).format('dddd, MMMM DD')}
                <span className='ml-4'>12AM - 12PM</span>
              </p>
            </div>
            <p className='ml-7 text-gray-600'>All day</p>
          </div>
          <div className='flex items-center'>
            <Users color='gray' size={20} />
            <Input
              id='addGuest'
              placeholder='Add guest'
              className='ml-2'
              disabled
            />
          </div>
          <div className='flex items-center'>
            <MapPin color='gray' size={20} />
            <Input
              id='addLocation'
              placeholder='Add location'
              className='ml-2'
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!formdata.title.trim()}
            onClick={() => saveEvent(formdata)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
