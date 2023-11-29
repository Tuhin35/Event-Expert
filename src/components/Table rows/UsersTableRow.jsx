import React, { useState } from 'react'
import { makeMerchant, uploadEvent } from '../../Service Operations/manageusers'
import DetailsModal from '../Modal/DetailsModal'
import { makeAdmin } from '../../Service Operations/Booking'
import { toast } from 'react-toastify'

const UsersTableRow = ({ user }) => {
    console.log()
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const { name, image, email, _id, role, merchantData } = user;
    // useEffect(() => { }, [isOpen])


    const modalHandler = () => {
        console.log("modal clicked");
        makeMerchant(user).then(data => {
            console.log(data)
            closeModal();
        })
    }
    const handleMakeAdmin = id =>{
        makeAdmin(id).then(data=>{
            console.log(data)
            if(data.modifiedCount > 0){
                toast.success('make admin successful')
              
              }
        })
    }
    return (
        <>
            <tr key={_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-snow-white-toned object-cover">
                    <img className="inline-block object-cover h-[2.875rem] w-[2.875rem] rounded-md ring-2 ring-white dark:ring-gray-800" src={image} alt={name} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-snow-white-toned">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-snow-white-toned">{email}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm  dark:text-snow-white-toned ${!role && `text-gray-800`}
                ${role === "admin" && `text-rose-800 font-bold dark:text-amber-500`} ${role === "merchant" && `text-emerald-600 dark:text-emerald-300 font-medium`}`}>
                    {!role && "user"}
                    {role === "admin" && "admin"}
                    {role === "merchant" && "merchant"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {
                        role === "requested" ?
                            <button className="py-1 px-2 rounded-full hover:text-white text-blue-500 hover:bg-gradient-to-tr from-emerald-200 to-cyan-300" onClick={openModal}>
                                Accept as merchant
                            </button>
                            :
                            <button onClick={()=>{handleMakeAdmin(_id)
                              }}
                               className="py-1 px-2 rounded-full hover:text-white text-emerald-700 bg-gradient-to-tr from-emerald-200 to-cyan-300">
                                Make admin
                            </button>



                    }

                    <DetailsModal
                        isOpen={isOpen}
                        closeModal={closeModal}
                        openModal={openModal}
                        user={user}
                        modalHandler={modalHandler}

                    />
                </td>
            </tr>

        </>
    )
}

export default UsersTableRow
