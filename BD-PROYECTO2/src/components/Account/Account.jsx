import React from 'react'
import './Account.css'

const Account = () => (
        <div className="form-group">
            <form className='form-login'>
            <h1 className='signin-title'>Account</h1>
            <label className="label-login">DPI</label>
            <input 
                type="text"
                id="dpi"
                required
                pattern="[0-9]{13}"
                className="input-login" 
                readOnly />
            <label className="label-login">Full Name</label>
            <input 
                type="text"
                id="name"
                required
                className="input-login"
                readOnly />
            <label className="label-login">Address</label>
            <input 
                type="text"
                id="adress"
                required
                className="input-login" />
            <label className="label-login">Phone</label>
            <input 
                type="tel"
                id="phone"
                required
                pattern="[0-9]{8}"
                className="input-login" />
            <label className="label-login">Collegiate ID</label>
            <input 
                type="text"
                id="collegiateid"
                required
                className="input-login"
                readOnly />
            <label className="label-login">Specialty</label>
            <input 
                type="text"
                id="specialty"
                required
                className="input-login"
                readOnly />
            <label className="label-login">Health area</label>
            <input 
                type="text"
                id="area"
                required
                className="input-login" />
            <label className="label-login">Work History</label>
            <input 
                type="text"
                id="history"
                required
                className="input-login" />  
                </form>
            <div className="buttons-container">
                <button className="button-login">Save</button>
            </div>
      </div>
)

export default Account