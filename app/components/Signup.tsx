import React, { useState } from "react";
import Image from "next/image";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignup = async () => {
        if (email && password) {
            try {
                // Call the API route to create the user
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (res.ok) {
                    // Optionally clear the form fields after successful signup
                    setEmail('');
                    setPassword('');
                    alert('Signup successful!');
                } else {
                    throw new Error('Failed to sign up');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert(error);
            }
        } else {
            alert('Please fill in both fields.');
        }
    };

    return (
        <dialog id="signup_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
                <div className="banner border-b-4 border-solid border-black flex p-2">
                    <h2 className="font-bold text-6xl p-4 me-auto">Red Rater</h2>
                    <Image
                        src="/DoubleT_BlkWht.png"
                        alt="Black and white Texas Tech Double T"
                        width={100}
                        height={100}
                        style={{ width: "20%", height: "20%" }}
                    />
                </div>
                <div className="modal-action flex flex-col w-full">
                    <div>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Texas Tech Email"
                                value={email}
                                onChange={handleEmail}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <input 
                                type="password" 
                                className="grow" 
                                placeholder="Password" 
                                value={password}
                                onChange={handlePassword}
                            />
                        </label>
                        <button 
                            className="btn bg-red-600 w-full hover:text-white hover:bg-black"
                            onClick={handleSignup}
                        >
                            Signup
                        </button>
                    </div>
                    <p className="self-center">
                        Don't have an account?{" "}
                        <button
                            className="text-red-600 underline"
                            onClick={() => {
                                const currModal = document.getElementById(
                                    "signup_modal"
                                ) as HTMLDialogElement;
                                const nextModal = document.getElementById(
                                    "login_modal"
                                ) as HTMLDialogElement;

                                if (currModal && nextModal) {
                                    // Verify objects are not null
                                    if (currModal.open) {
                                        currModal.close();
                                    }
                                    if (!nextModal.open) {
                                        nextModal.showModal();
                                    }
                                }
                            }}
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default Signup;
