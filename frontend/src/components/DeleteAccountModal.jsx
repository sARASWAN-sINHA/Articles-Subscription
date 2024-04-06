import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteUser } from '../state/user/thunk';
import Button from './Button';
import { CustomToastContainer, generateErrorToastr, generateSuccessToastr } from './Toastr';
import { authContext } from '../context';

const DeleteAccountModal = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useContext(authContext);
    const [currentPassword, setCurrentPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteUser(currentPassword))
            .then((res) => {
                if (res.payload.status == '204') {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    setTimeout(() => navigate('/'), 1000);
                }
                else {
                    generateErrorToastr("User deletion failed!");
                    const data = { ...res.payload.response.data };
                    [...Object.keys(data)].map((key) =>
                        data[key].map((errorMessage) =>
                            generateErrorToastr(errorMessage)
                        )
                    );
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <CustomToastContainer />
            <dialog id="deletion-modal" className="modal w-2/5 max-w-5xl rounded-lg ">
                <div className="modal-box p-4 text-center align-middle">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <svg className="mx-auto mb-4 w-12 h-12 text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="font-bold text-lg text-yellow-600">WARNING!!</h3>
                    <p className="py-4">Your are about to delete this account and all the articles written using this account</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='password'
                            className='w-full border-red-700 border-2 bg-red-100'
                            placeholder='Type password to confirm deletion'
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <div className='mt-3'>
                            <Button text={"DELETE"} />
                        </div>

                    </form>
                </div>
            </dialog>

        </>

    )
}

export default DeleteAccountModal