import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {createNewEvent} from "../../utils/Http.js"
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import {queryClient} from '../../utils/Http.js';

export default function NewEvent() {
  const navigate = useNavigate();


  const {mutate,isPending,isError, error}= useMutation({
      mutationFn : createNewEvent,
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['events']});
        navigate('/events');
      }
 });


  function handleSubmit(formData) {
    mutate({ event: formData});
    

  }



  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'submitting...'}
        {!isPending && (
           <>
           <Link to="../" className="button-text">
             Cancel
           </Link>
           <button type="submit" className="button">
             Create
           </button>
         </>
        )}
       
      </EventForm>
      {isError &&<ErrorBlock title="Failed to create events" message={error.info?.message||"Failed to fetch events"}/>}
    </Modal>
  );
}
