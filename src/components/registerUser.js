import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerDetails, setRegisterDetails] = useState({
    username: '',
    email: "",
    newPassword: "",
    confirmPassword: ""
  })

  async function register() {
    const { username, email, newPassword, confirmPassword } = registerDetails;
    if (username === "" && email === "" && newPassword === "" && confirmPassword === "") {
      toast.error("Please enter valid user details", {
        hideProgressBar: true
      })
      return;
    }
    if (confirmPassword !== newPassword) {
      toast.error("New password and confirm password should be same", {
        hideProgressBar: true
      })
      return;
    }

    try {
      const result = await axios.post('/register', { username, email, password: newPassword })
      if (result.status === 200) {
        toast.success("User added successfully", {
          hideProgressBar: true
        })
        navigate('/login')
      }
    } catch (e) {
      toast.error(`Something went wrong - ${e?.response?.data?.message}`, { 
        hideProgressBar: true
      })
    }
  }

  return (
    <div style={loginLayout} >
      <div style={innerbox} >
        <p style={{ marginTop: "25px", fontWeight: 700, fontSize: "18px" }} >Create your account here!!</p>
        <input onChange={(e) => setRegisterDetails({ ...registerDetails, username: e.target.value })} style={inputField} placeholder="Enter your user name" />
        <input onChange={(e) => setRegisterDetails({ ...registerDetails, email: e.target.value })} style={inputField} placeholder="Enter your email" />
        <input onChange={(e) => setRegisterDetails({ ...registerDetails, newPassword: e.target.value })} style={inputField} placeholder="Enter your new password" type="password" />
        <input onChange={(e) => setRegisterDetails({ ...registerDetails, confirmPassword: e.target.value })} style={inputField} placeholder="Enter your confirm password" type="password" />
        <button style={loginBtn} onClick={register} >Register</button>
        <p style={{ fontSize: "14px", fontWeight: 600, marginTop: "10px" }} >Already have an account? <span onClick={() => navigate('/login')} style={{ cursor: "pointer", color: "blue", marginLeft: "4px", fontWeight: 800 }}  >Login</span></p>
      </div>
    </div>
  );
}


const loginLayout = { display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", height: "100vh", width: "100%" }
const innerbox = { display: "flex", flexDirection: "column", alignItems: "center", height: "430px", width: "350px", border: "1px solid lightgrey", borderRadius: "10px", backgroundColor: "#f6f6f6" }
const inputField = { marginTop: "25px", height: "35px", width: "75%", border: "1px solid lightgrey", borderRadius: "8px", padding: "0px 10px", outline: 0 }
const loginBtn = { marginTop: "25px", height: "35px", width: "75%", fontSize: "18px", fontWeight: 700, color: "#fff", backgroundColor: "#9304ab", borderRadius: "8px" }