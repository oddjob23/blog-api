import React from 'react'
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
const HomePage = () => {
    return (
        <>
        <Navbar />
        <div className="container-fluid">
            <div className="row">
                <Sidebar/>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
                  
                </main>
            </div>
           
        </div>  
        </>
    )
}

export default HomePage;