import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth, updateProfile  } from 'firebase/auth';
import { toast } from "react-toastify";
import { doc, updateDoc } from 'firebase/firestore';
import {db} from "../firebase";

export default function Profile() {
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name,email} = formData
  const onLogout = ()=>{
    auth.signOut()
    navigate("/")
  }
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async ()=>{
    try{
        if(auth.currentUser.displayName !== name){
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
        
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef,{
          name:name,
        });
        }
        toast.success("Profile details updated")
      } catch(error){
        console.error(error)
        toast.error("Could not update profile details")
    }
}

return (
    <>
    <section className='max-w-6xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        My Profile
      </h1>
      
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          <input 
          onChange={onChange}
          type='text' id='name' value={name} 
          display={!changeDetail}
          className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out
          ${changeDetail ? "bg-red-200 focus:bg-red-200" : ""}`}>
          </input>
          <input type='email' id='email' value={email} disabled
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out mt-3 "
          >
          </input>
          
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>Do you want to change your name?
              <span onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState)=> !prevState);
                    }}
              className='text-red-600 
              hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                {changeDetail ? "Apply Change" : "Edit" } 
                </span>
            </p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out cursor-pointer'>
              Sign out
            </p>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}
