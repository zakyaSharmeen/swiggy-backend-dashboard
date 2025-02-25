import { useState } from "react";
import { API_Path } from "../../helpers/ApiPath";

function Login({ showWelcomeHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_Path}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Login Success");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log("vendorID",vendorId);
      
      const vendorResponse = await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const VendorFirmName = vendorData.vendor.firm[0].firmName;
console.log("checking for firmname",VendorFirmName);
        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", VendorFirmName);
        console.log("checking for firmid",vendorFirmId);
        window.location.reload();
      }


    } catch (err) {
      alert("Invalid credentials");

      console.log(err);
    }
  };

  return (
    <div>
      <div className="loginSection">
        <form className="authForm" onSubmit={loginHandler}>
          <h3>Vendor Login</h3>
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
            placeholder="enter your password"
            type="password"
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

export default Login;
