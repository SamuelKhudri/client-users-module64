import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef()
    const emailRef = useRef()

    //-----------handle function----------
    const handleAddUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            //   this is for notification on the top after added product
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added the user.')
                    e.target.reset();
                }
            })
        // name.prevent.value = ('');
        // email.prevent.value = ('');
        e.preventDefault();
    }
    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder="your name" />
                <input type="email" ref={emailRef} placeholder="email" />
                <input type="submit" value="submit" />
            </form>

        </div>
    );
};

export default AddUser;