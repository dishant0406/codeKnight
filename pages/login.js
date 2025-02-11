import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Context } from "../context";
import { useRouter } from "next/router";
import { Button } from 'antd';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //state
  const { state, dispatch } = useContext(Context);
  // console.log("STATE : ",state)
  const { user } = state;
  //router
  const router = useRouter();

  useEffect(() => {

    if (user !== null) router.push("/student/code");

    if (user !== null) router.push("/");

  }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    //Get data to this end point
    try {
      setLoading(true);
      //If there any api exist server will target backend through proxy
      const { data } = await axios.post(`https://vast-mesa-19498.herokuapp.com/api/login`, {

        email,
        password
      });
      // console.log("Login  User" ,data)
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      //Save in Local Storage
      window.localStorage.setItem("user", JSON.stringify(data));
      //  toast.success('Registration SucessFull');
      //  setLoading(false);
      //REDIRECT
      router.push("/user");
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }

  };

  return (

    <>
      <h1 className="pt-5 text-center">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>

          <Input
            type="email"
            className="form-control mb-4 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            prefix={<UserOutlined />}
            required
          />

          <Input.Password
            type="password"
            className="form-control mb-4 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          {!loading && <Button type="primary" htmlType="submit" style={{ width: '100%' }} shape="round" size="large"
            disabled={!email || !password || loading}>Submit</Button>}
          {loading && <Button type="primary" style={{ width: '100%' }} shape="round" size="large" loading>Loading</Button>}



        </form>
        <p className="text-center pt-3">
          Not Yet registered?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
        <p className="text-center text-danger">
          <Link href="/forgot-password">
            <a className="text-danger"> Forgot password</a>
          </Link>
        </p>
      </div>

    </>
  );
};

export default Login;
