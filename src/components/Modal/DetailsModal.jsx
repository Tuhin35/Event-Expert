import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { uploadEvent } from '../../Service Operations/manageusers'
import { toast } from 'react-toastify'

export default function DetailsModal({ isOpen, closeModal, openModal, user, modalHandler, merchantData }) {
    console.log(user?.merchantData)

    const [loading,setLoading] = useState(false)
         const uploadEventData = async()=>{
            const eventData = user?.merchantData?.eventData ;
            const uploadResult = await uploadEvent(eventData);
      
            if (uploadResult.acknowledged) {
              toast.success("Your data is uploaded");
              setLoading(false);
            }
            setLoading(true)
         }
    // const { NID, address, businessCategory, district, lisenceImage, phoneNum } = user?.merchantData && user.merchantData
    return (
        <>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-6">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        🤜🤛Marchent information
                                    </Dialog.Title>
                                    <div className="flex items-start justify-center gap-8 mt-2">
                                        <p className="text-sm text-gray-900 dark:text-snow-white font-medium">
                                            Business Category:
                                        </p>
                                        <span className='text-gray-600 place-items-start flex-1 font-inter text-sm'>{user?.merchantData?.eventData?.agency?.agencyName}</span>
                                    </div>
                                    <div className="flex items-start justify-center gap-8 mt-2">
                                        <p className="text-sm text-gray-900 dark:text-snow-white font-medium">
                                            NID:
                                        </p>
                                        <span className='text-gray-600 place-items-start flex-1 font-inter text-sm'>{user?.merchantData?.eventData?.NID}</span>
                                    </div>
                                    <div className="flex items-start justify-center gap-8 mt-2">
                                        <p className="text-sm text-gray-900 dark:text-snow-white font-medium">
                                            Event:
                                        </p>
                                        <span className='text-gray-600 place-items-start flex-1 font-inter text-sm'>{user?.merchantData?.eventData?.event}</span>
                                    </div>
                                    <div className="flex items-start justify-center gap-8 mt-2">
                                        <p className="text-sm text-gray-900 dark:text-snow-white font-medium">
                                           Price:
                                        </p>
                                        <span className='text-gray-600 place-items-start flex-1 font-inter text-sm'>{user?.merchantData?.eventData?.price}</span>
                                    </div>
                                    <div className="flex items-start justify-center gap-8 mt-2">
                                        <p className="text-sm text-gray-900 dark:text-snow-white font-medium">
                                            District:
                                        </p>
                                        <span className='text-gray-600 place-items-start flex-1 font-inter text-sm'>{user?.merchantData?.eventData?.agency?.location?.district}</span>
                                    </div>
                                    <div className="flex items-start justify-center gap-8 mt-2">
                                        <p className="text-sm text-gray-900 dark:text-snow-white font-medium">
                                            Image:
                                        </p>
                                        <img src={user?.merchantData?.lisenceImage} alt="lisence_Image" className="flex-1 max-w-xs max-h-[300px] object-cover rounded-md" />
                                    </div>

                                    <div className="flex justify-end gap-3.5">
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium primary-gradient text-indigo-800"
                                                onClick={()=>{uploadEventData()
                                                    modalHandler()}}
                                            >
                                                Accept ✔
                                            </button>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-rose-300  px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Decline X
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
