import React, { useEffect, useState } from "react";
import { getOrders } from "../../../Service Operations/service";

const DashBoardAllUser = () => {
  const [component, setComponent] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders().then((data) => {
      console.log(data);
      setComponent(data);
    });
  }, []);
  const handleDelete = (id) => {
    const proceed = window.confirm("Are You Sure to cancel this order");
    if (proceed) {
      fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remaining = allBookings.filter((odr) => odr._id !== id);
            setAllBookings(remaining);
          }
        });
    }
  };

  return (
    <div className=" container py-10 mx-auto">
      <table className="table w-full mx-auto bg-cyan-200">
        <thead>
          <tr>
            <th></th>
            <th>number</th>
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
              <th>
                {" "}
                <label>
                 { !(c?.price && c?.paid) && (<button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-ghost"
                  >
                    X
                  </button>)}
                </label>
              </th>
              <td>{i+1}</td>
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
                {c?.price && c?.paid && (
                  <span className="text-black  font-bold text-xxl">Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardAllUser;
