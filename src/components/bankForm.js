import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './bankForm.css';
import axios from 'axios';
import db from '../firebase';
/* eslint-disable */
const BankForm = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [bankDetails, setBankDetails] = useState(null);

    const fetchBankDetails = async () => {
        try {
          if (ifsc !== '') {
            const { data } = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
            setBankDetails(data);
          } else {
            setBankDetails(null);
          }
        } catch (error) {
          console.log(error);
          setBankDetails(null);
        }
      };

    useEffect(() => {
  fetchBankDetails();
}, [ifsc]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            firstName === '' ||
            lastName === '' ||
            phoneNumber === '' ||
            gender === '' ||
            ifsc === '' ||
            accountNumber === '' ||
            aadharNumber === '' ||
            address === ''
        ) {
            window.alert('Please fill in all required fields');
            return;
        }

        const aadharRegex = /^[2-9]{1}[0-9]{11}$/; //regex for aadhar
        const panRegex = /^([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/; //regex for pan
        const accountRegex = /^\d{9}$/ // standard 9 digits

        if (!accountRegex.test(accountNumber)) {
            window.alert('Invalid Account Number');
            return;
        }

        if (!panRegex.test(panNumber)) {
            window.alert('Invalid PAN Number');
            return;
        }

        if (!aadharRegex.test(aadharNumber)) {
            window.alert('Invalid Aadhar Number');
            return;
        }

        try {
            const { data } = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
            window.alert(`Form has correct data, you have submitted the form`);
            navigate('/');

            await db.collection('bankForms').add({
                firstName,
                lastName,
                email,
                phoneNumber,
                gender,
                ifsc,
                accountNumber,
                panNumber,
                aadharNumber,
                address,
                postalCode,
            });

            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setGender('');
            setIfsc('');
            setAccountNumber('');
            setPanNumber('');
            setAadharNumber('');
            setAddress('');
            setPostalCode('');


        } catch (error) {
            console.log(error, 'error');
            window.alert('Invalid IFSC Code');
        }

    };

    return (
        <div className="container d-flex form-detail">
            <h1 className="card-title text-center form-head">Bank Account Details</h1>
            <form className="p-8" >
                <div className="form-group row mb-3">
                    <label htmlFor="firstName" className="col-sm-4 col-form-label text-end label-style">First Name <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder='Enter your First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="lastName" className="col-sm-4 col-form-label text-end label-style">Last Name <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder='Enter your Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}

                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="email" className="col-sm-4 col-form-label text-end label-style">E-mail</label>
                    <div className="col-sm-8">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder='Enter your Email ID'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="phoneNumber" className="col-sm-4 col-form-label text-end label-style">Phone Number <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder='Enter your Phone Number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="gender" className="col-sm-4 col-form-label text-end label-style">Gender <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <select
                            className="form-control"
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer_not_to_say">Prefer Not to Say</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="ifsc" className="col-sm-4 col-form-label ps-4 label-style">IFSC Code <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="ifsc"
                            placeholder='Enter your IFSC code'
                            value={ifsc}
                            onChange={(e) => {
                                console.log(e.target.value); 
                                setIfsc(e.target.value);
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="accountNumber" className="col-sm-4 col-form-label text-end label-style">Account Number <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="accountNumber"
                            value={accountNumber}
                            placeholder='XXX XXX XXX'
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="panNumber" className="col-sm-4 col-form-label text-end label-style">PAN Number <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="panNumber"
                            placeholder='Enter your PANcard Number'
                            value={panNumber}
                            onChange={(e) => setPanNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="aadharNumber" className="col-sm-4 col-form-label text-end label-style">Aadhar Number <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="aadharNumber"
                            placeholder='XXXX-XXXX-XXXX'
                            value={aadharNumber}
                            onChange={(e) => setAadharNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="address" className="col-sm-4 col-form-label text-end label-style">Address <span className="text-danger">*</span></label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder='Enter your Primary Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <label htmlFor="postalCode" className="col-sm-4 col-form-label text-end label-style">Postal Code</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row mt-4">
                <div className='label-style'>

        {/*eslint-disable-next-line*/}
        {bankDetails && bankDetails.BANK && bankDetails.BRANCH ? (
          <h5>
            Your bank is <strong>{bankDetails.BANK}</strong> & branch is{' '}
            <strong>{bankDetails.BRANCH}</strong>
          </h5>
        ) : null}
      </div>

                    <div className="col-sm-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BankForm;
