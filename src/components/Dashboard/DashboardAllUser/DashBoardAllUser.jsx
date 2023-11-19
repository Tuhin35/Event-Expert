import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../Service Operations/service';

const DashBoardAllUser = () => {
    const [component, setComponent] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0);
      getOrders().then((data) => {
        console.log(data);
        setComponent(data);
      });
    }, []);
  
    return (
      <div className=" container py-10 mx-auto">
        <table className="table w-full mx-auto bg-cyan-200">
          <thead>
            <tr>
              <th></th>
              <th>Event</th>
              <th>Customers</th>
              <th>Price</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="mx-auto">
            {component?.map((c, i) => (
              <tr className="text-center border-b-2">
                <th>{i+1}</th>
                <td>{c.event}</td>
                <td className="flex flex-col">
                 
                 <p> {c.name}</p>
                 <p> {c.email}</p>
               </td>
                <td>{c.price}</td>
                <td className="flex flex-col">
                 
                  <p> {c.location}</p>
                  <p> {c.contact}</p>
                </td>
                <td className="">
                  <button className="btn btn-primary text-center  mx-auto">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default DashBoardAllUser