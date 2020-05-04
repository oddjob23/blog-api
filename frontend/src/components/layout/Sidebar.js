import React from 'react'
import { Home, File, ShoppingCart, Users, BarChart2, Layers } from 'react-feather';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              <span><Home /></span>
              Dashboard <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span>
                  <File />
              </span>
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span>
                  <ShoppingCart />
              </span>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span>
                  <Users />
              </span>
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span>
                  <BarChart2 />
              </span>
              Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <span data-feather="layers"></span>
              Integrations
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>
    )
}

export default Sidebar
