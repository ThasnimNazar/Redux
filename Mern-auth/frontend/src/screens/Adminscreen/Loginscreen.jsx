import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormComponent from "../../components/FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAdminLoginMutation } from '../../slices/Adminapislice'
import { setCredentials } from '../../slices/Adminauthslice'
import Loader from '../../components/Loader'



const Loginscreen = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector( (state) => state.auth );

  useEffect( () => {

    if(adminInfo) {

      navigate('/admin');

    }

  }, [ navigate, adminInfo ] );

  const submitHandler = async (e) => {

    e.preventDefault();

    try {
      
      const responseFromApiCall = await login( { email, password } ).unwrap();

      dispatch( setCredentials( { ...responseFromApiCall } ) );
      
      navigate('/admin');

    }catch(err){

      toast.error( err?.data?.message || err?.error );

    }

  };

    return (
      <FormComponent>
        <h1>Admin Sign In</h1>
  
        <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
              ></Form.Control>
              </Form.Group>
  
              <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                 
              ></Form.Control>
              </Form.Group>
  
              <Button type="submit" variant="primary" className="mt-3"> Sign In </Button>
        </Form>

        { isLoading && <> <Loader/> </>}
  
  
        <Row className="py-3">
          <Col> Have Admin registration access code? <Link to={`/admin/register`}>Register</Link></Col>
        </Row>
        
      </FormComponent>
    );
  };
  
  export default Loginscreen;
  