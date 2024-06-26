import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from '../../utils/Http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params=useParams()
  const {data , isPending, isError}=useQuery({
    queryKey:['events',params.id],
    queryFn:({signal})=>fetchEvent({signal, id:params.id})
  })

  function handleSubmit(formData) {}

  function handleClose() {
    navigate('../');
  }

  let content;
  if(isPending){ content=(
    <div className='center'>
      <LoadingIndicator/>
    </div>
  )}

  if(isError){ content=(
    <>
    <ErrorBlock title="Failed to load events" message={"Failed to load events"}/>
    <div className='forms-actions'>
      <Link to="../" className='button'>
        Okay
        </Link>
      
    </div>
    </>
  )}


  if(data){ content=(
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
  )}

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
