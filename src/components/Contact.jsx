import React, { useEffect, useState } from 'react';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact({userRef, listing}) {

  const [landlord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

    useEffect(()=>{
        const getLandLord = async () => {
            const docRef = doc(db, "users", userRef);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
              setLandLord(docSnap.data())
            }else{
              toast.error('Could not get landlord data')
            }

        }
        getLandLord();
    },[userRef]);

    const onChange = (e)=>{
      setMessage(e.target.value);
    }

  return (
    <>{landlord !== null &&(
      <div className='flex flex-col w-full'>
        <p>Contact {landlord.name} for the {listing.description.toLowerCase()}</p>
        <div className='mt-3 mb-6'>
          <textarea 
          name="message" 
          id="message"
          rows="2"
          value={message}
          onChange={onChange}
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white
          border border-gray-300 rounded transition duration-150
          ease-in-out focus:text-gray-700 focus:bg-white 
          focus:border-slate-600'
          >

          </textarea>
        </div>
        <a
        href={`mailto:${landlord.email}?Subject=${listing.description}&body=${message}`}
        >
          <button
          type='button'
          className='px-7 py-3 bg-blue-700 text-white
          rounded text-sm uppercase shadow-md hover:bg-blue-800
          hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg active:bg-blue-900 transition duration-150
          ease-in-out w-full text-center
          active:shadow-lg mb-6'
          >Send Message</button>

        </a>
      </div>
    )}</>
  )
}
