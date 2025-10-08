import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import useField from '../hooks/useField';
import useSignup from '../hooks/useSignup';


const Signup = ({setIsAuthenticated}) => {

    const navigate = useNavigate();
    const name = useField('text');
    const username = useField('text');
    const password = useField('password');
    const phoneNumber = useField('text');
    const profilePicture = useField('text');
    const gender = useField('text');
    const dateOfBirth = useField('date');
    const [role, setRole] = useState('user');
    const street = useField('text');
    const city = useField('text');
    const state = useField('text');
    const zipCode = useField('text');
    
    const {signup, error} = useSignup('/api/users/signup');

    const handleFormSubmit = async (e) => {
        e.preventDefault();


        await signup({
            name: name.value,
            username: username.value,
            password: password.value,
            phone_number: phoneNumber.value,
            profilePicture: profilePicture.value,
            gender: gender.value,
            date_of_birth: dateOfBirth.value,
            role: role,
            address: {
                street: street.value, 
                city: city.value,
                state: state.value,
                zipCode: zipCode.value, 
            }
        });

        if(!error){
            console.log('Success');
            setIsAuthenticated(true);
            navigate('/');
        }
    };

    return(
        <div className='create'>
            <h2>Signup</h2>
            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input {...name} />

                <label>Username:</label>
                <input {...username} />

                <label>Password:</label>
                <input {...password} />

                <label>Phone Number:</label>
                <input {...phoneNumber} />

                <label>Profile Picture:</label>
                <input {...profilePicture} />

                <label>Gender:</label>
                <input {...gender} />

                <label>Date of birth:</label>
                <input {...dateOfBirth} />

                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                </select>

                <label>Street:</label>
                <input {...street} />

                <label>City:</label>
                <input {...city} />

                <label>State:</label>
                <input {...state} />

                <label>Zip code:</label>
                <input {...zipCode} />

                <button>signup</button>
            </form>
        </div>
    )
}

export default Signup;