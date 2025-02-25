


import { useState } from "react";
import { API_Path } from "../../helpers/ApiPath";

function AddFirm() {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [offer, setOffer] = useState("");
  const [region, setRegion] = useState([]);
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(category.includes(value) ? category.filter((item) => item !== value) : [...category, value]);
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion(region.includes(value) ? region.filter((item) => item !== value) : [...region, value]);
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  



  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.log("User not authenticated");
        alert("You need to be logged in to add a firm.");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      category.forEach((value) => formData.append("category", value));
      region.forEach((value) => formData.append("region", value));

      if (file) {
        formData.append("image", file); 
      }

      const response = await fetch(`${API_Path}/firm/add-firm`, {
        method: "POST",
        headers: {
          "token": `${loginToken}`, 
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFirmName("");
        setArea("");
        setCategory([]);
        setOffer("");   
        setRegion([]);
        setFile(null);
        alert("Firm added successfully");
  
        
  
        console.log("Success:", data);
        console.log("Firm ID:", data.firmId);
        
        
  
        }else if(data.message === "Vendor can only add one firm"){
          alert("Firm excist!! You can only add one firm");
        }
        else{
          console.log("Failed:", data);
          alert("Failed to add firm.");
        }

        const mango = data.firmId;
        localStorage.setItem("firmId", mango);
        // console.log("Firm ID:", mango);
      


    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add firm.");
    }
};

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label>Firm Name</label>
        <input type="text" name="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)} />

        <label>Area</label>
        <input type="text" name="area" value={area} onChange={(e) => setArea(e.target.value)} />

        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Veg</label>
              <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={handleCategoryChange} />
            </div>
            <div className="checboxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" value="non-veg" checked={category.includes("non-veg")} onChange={handleCategoryChange} />
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input type="text" name="offer" value={offer} onChange={(e) => setOffer(e.target.value)} />

        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="regBoxContainer">
              <label>South Indian</label>
              <input type="checkbox" value="south-indian" checked={region.includes("south-indian")} onChange={handleRegionChange} />
            </div>
            <div className="regBoxContainer">
              <label>North Indian</label>
              <input type="checkbox" value="north-indian" checked={region.includes("north-indian")} onChange={handleRegionChange} />
            </div>
            <div className="regBoxContainer">
              <label>Chinese</label>
              <input type="checkbox" value="chinese" checked={region.includes("chinese")} onChange={handleRegionChange} />
            </div>
            <div className="regBoxContainer">
              <label>Bakery</label>
              <input type="checkbox" value="bakery" checked={region.includes("bakery")} onChange={handleRegionChange} />
            </div>
          </div>
        </div>

        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddFirm;

