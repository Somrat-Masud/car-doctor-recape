import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const CheckOut = () => {
    const {user} = useContext(AuthContext)
  const servicesCa = useLoaderData();
  const { title ,price, _id, img} = servicesCa;


  const handleBookServices =event => {
event.preventDefault();
const form = event.target;
const name = form.name.value;
const date = form.date.value;
const email = user?.email

const order = {
    cutomarName: name,
    email,
    date,
    img,
    service:title,
    service_id:_id,
    price:price
}
console.log(order)

fetch('http://localhost:3004/bookings',{
    method:'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(order)
})
.then(res => res.json())
.then(data => {
    console.log(data)
    if(data. insertedId){
        alert('Booking Successfully')
    }
    
})

  }


  return (
    <div>
      <h2 className="text-center text-3xl font-bold">BookServices: {title}</h2>:
            <div className="card-body">
         <form onSubmit={handleBookServices}>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  defaultValue={user?.displayname}
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered"
                  required
                />
        
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  defaultValue={user?.email}
                 name="email"
                  className="input input-bordered"
                  required
                />
        
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deu Amaount</span>
                </label>
                <input
                  type="text"
                  defaultValue={'$'+ price}
                  className="input input-bordered"
                  required
                />
        
              </div>
        </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary btn-btn-block" type="submit" value="Order Confirm" />
              </div>
         </form>
            </div>
          </div>
  );
};

export default CheckOut;
