import { useContext, useEffect, useState } from 'react'
import {Helmet,Row,Col,Card,Store,Link,Button,useNavigate,toast,getError,axios,Form} from '../Imports'

function ProfilePage() {
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo } = state

    const navigate = useNavigate()

    const [changePasswordField, setChangePasswordField] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [changeNameField, setChangeNameField] = useState(false)
    const [newName, setNewName] = useState('')

    const [changeEmailField, setChangeEmailField] = useState(false)
    const [newEmail, setNewEmail] = useState('')

    const UpdateUserData = async e => {
        e.preventDefault()
        const updatedUser = {
            _id: userInfo._id,
            email: newEmail === '' ? userInfo.email : newEmail,
            name: newName === '' ? userInfo.name : newName,
            currentPassword: currentPassword,
            newPassword: newPassword
        }

        try {
            const { data } = await axios.put('/api/v1/users/update', updatedUser, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })
            ctxDispatch({ type: 'USER_UPDATE', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            toast.success('User was updated')
        } catch (err) {
            toast.error(getError(err))
        }

        navigate('/profile')
    }

    useEffect(() => {
        console.log(newName)
        console.log(newEmail)
        console.log(newPassword)
    }, [newName, newEmail, newPassword])

    return (
        <div>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className='my-3'>User Profile</h1>
            <Row>
                <Col md={8}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Profile details</Card.Title>

                            {/* //* Name Update field */}
                            <div>
                                <strong>Name: </strong>
                                <Card.Text>{userInfo.name}</Card.Text>
                                {!changeNameField ? (
                                    <Link
                                        onClick={
                                            changeNameField
                                                ? () => setChangeNameField(false)
                                                : () => setChangeNameField(true)
                                        }
                                    >
                                        Edit
                                    </Link>
                                ) : (
                                    <Form onSubmit={e => UpdateUserData(e)}>
                                        <Form.Group className='mb-3' controlId='name'>
                                            <Form.Label>New name: </Form.Label>
                                            <Form.Control
                                                value={newName}
                                                type='text'
                                                onChange={e => setNewName(e.target.value)}
                                            />
                                        </Form.Group>

                                        <div className='mb-3'>
                                            <Button variant='primary' type='submit'>
                                                Update name
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </div>
                            <hr />

                            {/* //* Email Update field */}
                            <div>
                                <strong>Email: </strong>
                                <Card.Text>{userInfo.email}</Card.Text>
                                {!changeEmailField ? (
                                    <Link
                                        onClick={
                                            changeNameField
                                                ? () => setChangeEmailField(false)
                                                : () => setChangeEmailField(true)
                                        }
                                    >
                                        Edit
                                    </Link>
                                ) : (
                                    <Form onSubmit={e => UpdateUserData(e)}>
                                        <Form.Group className='mb-3' controlId='email'>
                                            <Form.Label>New email: </Form.Label>
                                            <Form.Control
                                                value={newEmail}
                                                type='email'
                                                onChange={e => setNewEmail(e.target.value)}
                                            />
                                        </Form.Group>

                                        <div className='mb-3'>
                                            <Button variant='primary' type='submit'>
                                                Update email
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </div>
                            <hr />

                            {/* //* Password Update field */}
                            <div>
                                <strong>Password: </strong>
                                {!changePasswordField ? (
                                    <Link
                                        onClick={
                                            changePasswordField
                                                ? () => setChangePasswordField(false)
                                                : () => setChangePasswordField(true)
                                        }
                                    >
                                        Edit
                                    </Link>
                                ) : (
                                    <Form onSubmit={e => UpdateUserData(e)}>
                                        {/* Full name input area */}
                                        <Form.Group className='mb-3' controlId='password'>
                                            <Form.Label>Current password</Form.Label>
                                            <Form.Control
                                                value={currentPassword}
                                                type='password'
                                                onChange={e => setCurrentPassword(e.target.value)}
                                            />
                                        </Form.Group>

                                        {/* Address input area */}
                                        <Form.Group className='mb-3' controlId='address'>
                                            <Form.Label>New password</Form.Label>
                                            <Form.Control
                                                value={newPassword}
                                                type='password'
                                                onChange={e => setNewPassword(e.target.value)}
                                            />
                                        </Form.Group>

                                        <div className='mb-3'>
                                            <Button variant='primary' type='submit'>
                                                Update password
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}></Col>
            </Row>
        </div>
    )
}

export default ProfilePage