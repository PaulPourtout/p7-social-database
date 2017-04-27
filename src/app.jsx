import React, {Component} from 'react';
import styled from 'styled-components';

const Login = styled.button`
  width: 150px;
  height: 80px;
  background-color: transparent;
  border: 2px solid rgb(86, 215, 142);
  color: rgb(86, 215, 142);
`;

class LoginComponent extends Component {
  constructor(porps) {
    super(props)
  }
render(){
  return (
    <div>
      <Login></Login>
    </div>
  )
}

}
export default LoginComponent;
