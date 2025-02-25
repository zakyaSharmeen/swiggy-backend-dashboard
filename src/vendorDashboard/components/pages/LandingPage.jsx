import Login from "../forms/Login"
import AddFirm from "../forms/AddFirm"
import { useEffect, useState } from "react"
import Register from "../forms/Register"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import Welcome from "../forms/Welcome"
import AddProducts from "../forms/AddProducts"
import AllProducts from "../AllProducts"

function LandingPage() {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showFirm, setShowFirm] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const[showWelcome, setShowWelcome] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [showLogOut, setShowLogOut] = useState(false)
    const [showFirmTitle, setShowFirmTitle] = useState(true)   

    useEffect(()=>{
        const loginToken = localStorage.getItem("loginToken")
        if(loginToken){
            setShowLogOut(true)}
    },[])

    useEffect(()=>{

        const firmName = localStorage.getItem("firmName")
        if(firmName){
            setShowFirmTitle(false)}
    },[])



    const logOutHandler = () => {
        confirm("Are you sure you want to logout?")
        localStorage.removeItem("loginToken")
        localStorage.removeItem("firmId")
        localStorage.removeItem("firmName")
        setShowLogOut(false)
        setShowFirmTitle(true)

    }

    const showLoginHandler = () => {
            setShowLogin(true)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
        

    }

    const showRegisterHandler = () => {
        setShowRegister(true)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)


    }

    const showFirmHandler = () => {
       if(showLogOut){
        setShowFirm(true)
        setShowLogin(false)
        setShowRegister(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
       }
else{
    alert("Please login to add firm")
    setShowLogin(true)
}


    }

    const showProductHandler = () => {
        if(showLogOut){
            setShowProduct(true)
        setShowLogin(false)
        setShowRegister(false)
        setShowFirm(false)
        setShowWelcome(false)
        setShowAllProducts(false)
        }else{
            alert("Please login to add product")
            setShowLogin(true)
        }


    }

    const showWelcomeHandler = () => {
        setShowWelcome(true)
        setShowLogin(false)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowAllProducts(false)

    }

  


    
    const showAllProductsHandler = () => {
        if(showLogOut){
            setShowAllProducts(true)

            setShowWelcome(false)
            setShowLogin(false)
            setShowRegister(false)
            setShowFirm(false)
            setShowProduct(false)   
         }else{
            alert("Please login to view all products")
            setShowLogin(true)
         }
        }



  return (
    <section className="landingSection">
        <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} logOutHandler={logOutHandler} showLogOut={showLogOut}/>
        <Sidebar showFirmHandler= {showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler}
        showFirmTitle={showFirmTitle}
        />
        <div className="">
        
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler}/>}
        {showRegister && <Register showLoginHandler={showLoginHandler}/>}
        {showFirm && showLogOut && <AddFirm/>}
        {showProduct && showLogOut &&<AddProducts/>}
        {showWelcome && <Welcome/>}
        {showAllProducts && showLogOut && <AllProducts />}

        

        </div>
    </section>
  )
}

export default LandingPage