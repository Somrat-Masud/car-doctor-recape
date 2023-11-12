import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3004/servicesCar`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="mt-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-600"> Services</h2>
        <h2 className="text-5xl "> Our Services Area</h2>
        <p>This is a Services and Good Services Gather Then Our Services.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
        services.map((service) => (
       <ServiceCard key={service._id} service={service}></ServiceCard>
        ))
        }
      </div>
    </div>
  );
};

export default Services;
