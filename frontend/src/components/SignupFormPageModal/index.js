// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import './SignupForm.css';
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import SignupForm from "./SignupForm";




function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="subtmit-button" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
