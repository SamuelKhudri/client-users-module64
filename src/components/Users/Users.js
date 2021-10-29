import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    // handle delete function
    const handleDelUser = id => {
        const proceed = window.confirm('Are you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully')

                        const remainUser = users.filter(user => user._id !== id);
                        setUsers(remainUser);
                    }
                })
        }
    }
    return (
        <div>
            <h2>Users available: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li
                        key={user._id}
                    >name: {user.name} email:{user.email} <br />
                        <Link to={`/users/update/${user._id}`}><button>update</button></Link>
                        <button onClick={() => handleDelUser(user._id)} >X</button>
                    </li>)
                }
            </ul>


        </div>
    );
};

export default Users;