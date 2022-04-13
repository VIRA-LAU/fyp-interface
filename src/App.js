import React, {useState, useEffect} from "react";
import fire from "./fire";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import Login from "./Login";
import Home from "./Home";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./layouts";
import Stats from "./components/Stats";
import Players from "./components/Players/index";


const App = () => {
    const auth = getAuth(fire);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // handle any errors related to email and password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleLogin = () => {
        clearErrors();
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        createUserWithEmailAndPassword(auth, email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        signOut(auth);
    };

    const authListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    console.log(user)

    return (
        <div className="App">
            {user ?  (

                <Routes>


                    <Route index element={<Home handleLogout={handleLogout} />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/players" element={<Players />} />

                </Routes>
            ) : (
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSignup={handleSignup}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            )}
        </div>
    );
};

export default App;
