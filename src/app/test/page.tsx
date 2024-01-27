'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { set } from 'date-fns';
import React from 'react';


const members = ["john", "aaron", "jeff", "reid"]
const users = {
    john: {
        id: "1",
        name: "john",
        age: 30,
        email: ""
    }
}
const Page = () => {
  const [formStatus, setFormStatus] = React.useState(false);
  
  React.useEffect(() => {
    if (members) {
    setFormStatus(true)
    }
  }, [])


  return (
    <div>
      <h1>Test Form</h1>
      <Button onClick={() => setFormStatus(true)}> Open</Button>{' '}
      
        {members.map((member, index) =>  (
            <p key={index}>{member}</p>

        ))}

        
      

    </div>
  );
};

export default Page;
