import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

const ContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isView, setIsView] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userFullName, setUserFullName] = useState("")
    const [showUpgrade, setShowUpgrade] = useState(false)
    const [endChat, setEndChat] = useState(false)
    const [userToken, setUserToken] = useState("")
    const [threadId, setThreadId] = useState("")

    useEffect(() => {
        if (showUpgrade === true) {
            setTimeout(() => {
                setShowUpgrade(false);
                console.log("timeout executed")
            }, 5000);
        }

        
        return;
    }, [showUpgrade]);


    //end task
    useEffect(() => {
        if (endChat === true) {
            setTimeout(() => {
                setEndChat(false);
            }, 5000)
        }
    }, [endChat])


    // toggle password visibility
    const viewPassword = () => {
        setIsView(!isView)

        let showPass = document.getElementById("showPass")
        if (showPass.type === "password") {
            showPass.type = "text"
        } else {
            showPass.type = "password"
        }   
    }

    //set fullname
    const getFullNameValue = e => {
        setUserFullName(e.target.value)
    }

    // set email
    const getEmailValue = e => {
        setEmail(e.target.value)
    }

    // set password
    const getPasswordValue = e => {
        setPassword(e.target.value)
    }

    //open side nav
    const openSideNav = () => {
        const sideBarElement = document.getElementById("sideBar");
        if (sideBarElement) {
            sideBarElement.style.width = "25%";
        }
    }

    //close side nav
    const closeSideNav = () => {
        const sideBarElement = document.getElementById("sideBar");
        if (sideBarElement) {
            sideBarElement.style.width = "0";
        }
    }

    const createNewThread = async () => {
        try {
            const { data } = await axios.post('https://klus-hc.onrender.com/api/v1/threads', {}, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            });
    
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error creating new thread:', error);
            throw error; // You can handle or rethrow the error as needed
        }
    };


    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            getEmailValue,
            getPasswordValue,
            isView,
            setIsView,
            viewPassword,
            email,
            password,
            userFullName,
            setEmail,
            setPassword,
            setUserFullName,
            getFullNameValue,
            openSideNav,
            closeSideNav,
            showUpgrade,
            setShowUpgrade,
            endChat,
            setEndChat,
            userToken,
            setUserToken,
            threadId,
            setThreadId,
            createNewThread,
        }}
        >
            {props.children}
        </AuthContext.Provider>

    )
}

export {ContextProvider, AuthContext}