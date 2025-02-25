import { useState } from "react";
import { API_Path } from "../../helpers/ApiPath";

function Register({showLoginHandler}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_Path}/vendor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("vendor registered sucessfully");
        setUsername("");
        setEmail("");
        setPassword("");
        showLoginHandler()
      }
    } catch (err) {
      console.log(err);
      alert("oops! vendor registered unsucessfully");
    }
  };

  return (
    <div>
      <div className="registerSection">
        <form className="authForm" autoComplete="off" onSubmit={handleSubmit}>
          <h3>Vendor Register</h3>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter your name"
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;



// import { useState } from "react";
// import { API_Path } from "../../helpers/ApiPath";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => { 
//     e.preventDefault();

//     if (!username || !email || !password) {
//       alert("All fields are required");
//       return;
//     }

//     if (!email.includes("@")) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     try {
//       console.log(`API Path: ${API_Path}/vendor/register`);

//       const response = await fetch(`${API_Path}/vendor/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to register vendor");
//       }

//       console.log("Success:", data);
//       alert("Vendor registered successfully");
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Oops! Vendor registration unsuccessful");
//     }
//   };

//   return (
//     <div className="registerSection">
//       <form className="authForm" autoComplete="off" onSubmit={handleSubmit}>
//         <h3>Vendor Register</h3>

//         <label>Username</label>
//         <input 
//           type="text" 
//           name="username" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//           placeholder="Enter your name" 
//           required
//         />
//         <br />

//         <label>Email</label>
//         <input 
//           type="email" 
//           name="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           placeholder="Enter your email" 
//           required
//         />
//         <br />

//         <label>Password</label>
//         <input 
//           type="password" 
//           name="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           placeholder="Enter your password" 
//           required
//         />
//         <br />

//         <div className="btnSubmit">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;

