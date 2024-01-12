import React, { useContext, useEffect, useState } from "react";

import { getOrder } from "../../../Service Operations/service";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Sidebar from "../../../components/Dashboard/Sidebar";
import { Link } from "react-router-dom";

const Order = () => {
  const [component, setComponent] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    getOrder(user).then((data) => {
      console.log(data);
      setComponent(data);
    });
  }, [user]);
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
  // const [price,_id,event,email,name,location] = component
  //  console.log(component)
  //  console.log(_id)
  //  console.log(user?.displayName)
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className=" container py-10 mx-auto">
        <table className="table w-full mx-auto bg-lime-200">
          <thead>
            <tr>
              <th></th>
              <th>Event</th>
              <th>Customer info</th>
              <th>Price</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="mx-auto">
            {component?.map((c, i) => (
              <tr className="text-center p-2">
                <th>
                  <label>
                  { !(c?.price && c?.paid) && (<button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-ghost p-4"
                  >
                    X
                  </button>)}
                  </label>
                </th>
                <td>{c.event}</td>
                <td className="flex flex-col">
                  <p>{c.name}</p>
                  <p>{c.email}</p>
                </td>
                <td>{c?.price}</td>
                <td className="flex flex-col">
                  <p> {c?.location}</p>
                  <p> {c?.contact}</p>
                </td>
                <td className="text-center">
                  <button className="btn ">
                    {c?.price && !c?.paid && (
                      <Link to={`/payment/${c?._id}`}>
                        <button className="btn  btn-sm">Pay</button>
                      </Link>
                    )}

                    {c?.price && c?.paid && (
                      <span className="text-green-600 text-xl">Paid</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
