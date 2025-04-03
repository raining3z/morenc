import { useParams } from 'react-router-dom';

export default function EventDetails() {
  const { eventName } = useParams();
  console.log(eventName);
  return <h1>{eventName}</h1>;
}
