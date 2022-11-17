import React, {useState} from 'react';

import './login.css';

const Login = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [college, setCollege] = useState("");
    const [university, setUniversity] = useState("");

    const [msg, setMsg] = useState("");
 
    const handleChange = () => {
        setIsLogin(!isLogin);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleCollegeChange = (e) => {
        setCollege(e.target.value);
    }

    const handleUniversityChange = (e) => {
        setUniversity(e.target.value);
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        login(email, password);        
    }

    const handleRegister = (e) => {
        console.log("hiiiige");
        e.preventDefault();
        
        if(password!==confirmPassword){return false;}
        register(name,email,password, confirmPassword, college, university);
    }

    const register = async(name, email, password, confirmPassword, college, university) => {
        console.log(name, email, password, confirmPassword, college, university);
        const req = await fetch('http://localhost:8080/user/register', {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,email:email,password:password, confirmPassword:confirmPassword, college:college, university:university})
        });
        const res = await req.json();
        console.log(res);
        if(res.user_id){
            localStorage.setItem('email', req.user_id);
            props.setIsLoggedIn(true);
        }
        setMsg(res.msg);
        setTimeout(()=>{
            setMsg("");
        },3500);
    }
 
    const login = async(email, password) => {
        console.log(email, password);
        const req = await fetch('http://localhost:8080/user/login', {
          method:"POST",
          headers: {
            'Content-Type':"application/json"
          },
          body:JSON.stringify({email:email, password:password})
        });
        const res = await req.json();
        if(res.user){
            localStorage.setItem("email", res.user.id);
            props.setIsLoggedIn(true);
        }
        setMsg(res.msg);
        
        setTimeout(()=>{
            setMsg("");
        },3500);
      }

    return (
        <section class="login-section">
        <h1>Student Network</h1>
        <div class="login-page">
            <h2>Login/Sign Up</h2>
            {isLogin?
                <form onSubmit={handleLogin} method="POST" action="http://localhost:8080/user/login">
                    <input value={email} onChange={handleEmailChange} type="email" name="email" placeholder="Email" />
                    <input value={password} onChange={handlePasswordChange} type="password" name="password" placeholder="Password" />
                    <input type="submit" value="Login" />                
                </form>: 
                <form onSubmit={handleRegister} method="POST" action="http://localhost:8080/user/register">
                    <input value={name} onChange={handleNameChange} type="text" name="name" placeholder="Enter Name" />
                    <input value={email} onChange={handleEmailChange} type="email" name="email" placeholder="Email" />
                    <input value={password} onChange={handlePasswordChange} type="password" name="password" placeholder="Password" />
                    <input value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" name="confirmPassword" placeholder="Confirm Password" />
                    <input value={college} onChange={handleCollegeChange} type="text" name="college" placeholder="College" />
                    <input value={university} onChange={handleUniversityChange} type="text" name="university" placeholder="University" />
                    
                    <input type="submit" value={isLogin?"Login":"Register"} />                
                </form> }
            
                {msg}
            

            <p>No Account Yet? <a className="link" onClick={handleChange}>{isLogin?"Sign Up":"Log In"}</a></p>
            <a>Forgot Password?</a>
        </div>
    </section>
    );
}

export default Login;