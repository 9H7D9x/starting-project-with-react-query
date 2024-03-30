export async function fetchEvents({signal,searchTerm}){
    let url ='http://localhost:3000/events';
    
    if(searchTerm){
        url +='?search=' + searchTerm;
    }

    const response = await fetch(url, {signal : signal});
    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
}

export async function createNewEvent({eventData}){
    const res=await fetch("http://localhost:3000/events",{
        method:"Post",
        body:JSON.stringify(eventData),
        headers:{
            'content-type':'appliction/json',
        },
    })

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;

}