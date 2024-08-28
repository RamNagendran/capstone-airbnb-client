import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { commonActions } from "../redux/State";


export default function LoginPage() {
    const navigate = useNavigate();
    const dispacth = useDispatch();

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    })


    async function login() {
        const { username, password } = loginDetails;
        if (username !== "" && password !== '') {
            try {
                const res = await axios.post('/login', { username, password })
                if (res?.data) {
                    dispacth(commonActions.setLoginDetails({ userDetails: res.data.userDetails, authToken: res.data.authToken }))
                    toast.success('Logged in successfully', {
                        hideProgressBar: true
                    })
                    navigate('/')
                }
            } catch (e) {
                toast.error(`Something happened : ${e?.response?.data?.message}`, {
                    hideProgressBar: true
                })
            }

        } else {
            toast.error('Please enter valid username and password', {
                hideProgressBar: true
            })
        }
    }


    return (
        <div style={loginLayout} >
            <div style={innerbox} >
                <p style={{ marginTop: "25px", fontWeight: 700, fontSize: "18px" }} >Welcome back!!</p>
                <input onChange={(e) => setLoginDetails({ ...loginDetails, username: e.target.value })} style={inputField} placeholder="Enter your user name" />
                <input type="password" onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} style={inputField} placeholder="Enter your password" />
                <button style={loginBtn} onClick={login} >Login</button>
                <p style={{ fontSize: "14px", fontWeight: 600, marginTop: "10px" }} >Don't have an account? <span onClick={() => navigate('/register/user')} style={{ cursor: "pointer", color: "blue", marginLeft: "4px", fontWeight: 800 }} >Signup</span></p>
            </div>
        </div>
    );
}

const loginLayout = { display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", height: "100vh", width: "100%" }
const innerbox = { display: "flex", flexDirection: "column", alignItems: "center", height: "350px", width: "350px", border: "1px solid lightgrey", borderRadius: "10px", backgroundColor: "#f6f6f6" }
const inputField = { marginTop: "25px", height: "35px", width: "75%", border: "1px solid lightgrey", borderRadius: "8px", padding: "0px 10px", outline: 0 }
const loginBtn = { marginTop: "25px", height: "35px", width: "75%", fontSize: "18px", fontWeight: 700, color: "#fff", backgroundColor: "#9304ab", borderRadius: "8px" }