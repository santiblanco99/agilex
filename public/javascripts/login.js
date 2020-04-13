const React = require('react');
const Bootstrap = require('bootstrap/dist/css/bootstrap.min.css');
import { Form, Button } from 'react-bootstrap';
const fire = require('./fire.js');

class Login extends Component  {

    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email : "",
            password : ""
        };
    }

    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err)
        });
    }

    handleChange(e)
    {
        this.setState({
            [e.target.name ] : e.target.value
        });
    }

    render() {
        return (
        <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" id="email" name="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" id="password" name="password"placeholder="Password"  onChange={this.handleChange} value={this.state.password}/>
            </Form.Group>
            <Button variant="primary" type="submit">Ingresar</Button>
          </Form> )
    }
