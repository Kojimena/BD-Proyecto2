import React from 'react'
import './AllUsers.css'
import Account from '../../components/Account/Account'

//VER ACCOUNT

const AllUsers = () => (
    <div >
        <div className="search-container">
        <label className="label-inventory">Search doctor</label>
        <input
            type="search"
            className="search-input"
            placeholder="Doctor's DPI"
        />
        <i class="fas fa-search "></i>
        </div>
        <div className="search-buttons">
        <button className="button-search">Search</button>
        </div>

        <div>
        <Account/>
        </div>
  </div>
)

export default AllUsers