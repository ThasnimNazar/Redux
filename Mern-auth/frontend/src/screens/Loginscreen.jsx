import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormComponent from '../components/FormComponent'
import { useLoginMutation } from '../slices/Userapislice'
import { setCredentials } from '../slices/Authslice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'


const Loginscreen = () => {
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const Navigate = useNavigate()
 const Dispatch = useDispatch()
 const [login,{isLoading}] = useLoginMutation()
 //call the useLoginMutation function and set loading state without manually setting the state

 const { userInfo } = useSelector((state) => state.auth);
 //to select the state we want

 useEffect(()=>{
    if(userInfo){
        Navigate('/')
    }
 },[Navigate,userInfo])

 const submitHandler = async(e)=>{
    e.preventDefault()
    try{
        console.log('pp')
   const res = await login({email,password}).unwrap()
   //calling the login function in useloginmutation and it returns a promise,it will takecare the calling in backend and the
   //response frm backend is initialized to res variable
   Dispatch(setCredentials({...res}))
   //setting user to localstorage
  Navigate('/')
    }
    catch(err){
    toast.error(err?. data?.message || err.error)
    }
 }
  return (
    <div>
    <FormComponent>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className = 'my-2' controlId = 'email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type = 'email'
                placeholder = 'enter email'
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}
                >
            </Form.Control>
        </Form.Group>

        <Form.Group className = 'my-2' controlId = 'password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type = 'password'
                placeholder = 'enter password'
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}
                >
            </Form.Control>
        </Form.Group>

        { isLoading && <Loader/> }
        <Button type ='submit' variant = 'primary' className='mt-3'>login</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New customer?<Link to = '/register'>Register</Link>
            </Col>
        </Row>
    </FormComponent>
    </div>
  )
}

export default Loginscreen

//usedispatch = to dispatch actions,
//useselector = to select state globally