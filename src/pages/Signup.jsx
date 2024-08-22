import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessToast from '../components/SuccessToast';

function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [showToast, setShowToast] = useState(false);

    const [toastData, setToastData] = useState(null);

    const handleInputChanges = (e) => {
        const { name, value } = e.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create', formData)
            setToastData(response.data)
            setShowToast(true)
            navigate('/dashboard')

            setTimeout(() => {
                setShowToast(false)
            }, 3000)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Container className='mt-5'>
            <div className="d-flex justify-content-center align-item-center">

                <h1></h1>
                <div className='w-50'>
                    <h1 className='text-center m-3'>Sign up form </h1>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name='name'
                                value={formData.name}
                                onChange={handleInputChanges}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name='email'
                                value={formData.email}
                                onChange={handleInputChanges}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={formData.password}
                                onChange={handleInputChanges}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>


            <div className='float-end'>
                {showToast && <SuccessToast userData={toastData} />}
            </div>
        </Container>
    );
}

export default Signup;