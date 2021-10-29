import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const { id } = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);

    // input name function take
    const hanNameChange = e => {
        const updateName = e.target.value;
        const updateUser = { name: updateName, email: user.email }
        // console.log(e.target.value);
        setUser(updateUser);
    }
    // handle change email input
    const hanEmailChange = e => {
        const updateEmail = e.target.value;
        // const updateUser = { ...user };
        // updateUser.email = updateEmail
        const updateUser = { name: user.name, email: updateEmail }
        setUser(updateUser);
    }
    // update user function handle
    const handleUpdataUser = e => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successful');
                    setUser({});
                    e.target.reset();
                }
            })
        e.preventDefault();
    }


    return (
        <div>
            <h2>This is Update User: {user.name}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUpdataUser}>
                <input type="text" onChange={hanNameChange} value={user.name} />
                <input type="email" onChange={hanEmailChange} value={user.email} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default UpdateUser;