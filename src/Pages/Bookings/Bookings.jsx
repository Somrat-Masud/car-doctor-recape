import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const url = `http://localhost:3004/bookings?email=${user?.email}`;

  const handleDelete = id =>{
    const proced = confirm('Are you delete for Account ')
    if(proced){
fetch(`http://localhost:3004/bookings/${id}`,{
    method:'DELETE'
})
.then(res => res.json())
.then(data => {
    console.log(data)
if(data.deletedCount > 0 ){
    alert('delete Successfully');

    const remaining = bookings.filter(booking => booking._id !==id);
    setBookings(remaining);
}

})
}
}

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [url]);

const handleBookingConfirm = id => {
fetch (`http://localhost:3004/bookings/${id}`,{
    method:'PATCH',
    headers: {
        'content-type':'application/json'
    },
    body:JSON.stringify({status:'confirm'})
})
.then((res) => res.json())
.then((data) => {
    if(data.modifiedCount > 0 ){
        const remaining = bookings.filter(booking => booking._id !==id);
        const updated = bookings.find(booking => booking._id ===id);
        updated.status = 'confirm';
        const newBookings = [updated, ...remaining];
        setBookings(newBookings)
    }
})

}


  return (
    <div>
      <h2 className="text-3xl text-center">Book:{bookings.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Images</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
         {
            bookings.map(booking => <BookingRow 
            key={booking._id}
            booking={booking}
            handleDelete={handleDelete}
            handleBookingConfirm={handleBookingConfirm}
            >

            </BookingRow>)
         }
         
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
