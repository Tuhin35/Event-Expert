import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../Service Operations/manageusers';
import UsersTableRow from '../../../components/Table rows/UsersTableRow';
import Spinner from '../../../components/Spinners/Spinner';

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUsers().then(data => {
            console.log(data);
            setUsers(data)
            setLoading(false)
        })
    }, [])
    return (
        <>

            {
                loading ? <Spinner />
                    :
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="border rounded-lg shadow overflow-hidden dark:border-slate-50 dark:shadow-slate-900">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-50">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Image</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Email</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-white">Role</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-white">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {
                                                users?.map(user => (
                                                    <UsersTableRow user={user} />
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default AllUsers
