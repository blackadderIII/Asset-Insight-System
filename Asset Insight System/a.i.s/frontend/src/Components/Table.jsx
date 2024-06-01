import React, { createRef ,useState} from "react";
import "../css/Table.css";
import emptyPng from "../Assets/icons/empty.png";

export default function Table({ laptops,loading,onEdit}) {
  const loadingRef = createRef();
 
  
  return (
    <div class="third-row">
      <table id="laptops">
        <thead>
          <th>SN</th>
          <th>Brand</th>
          <th>Model</th>
          <th></th>
          <th>User</th>
          <th>Date Added</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </thead>

        <tbody id="main-table">
          {loading ? (
            <div className="loading" ref={loadingRef}></div>
          ) : laptops.length === 0 ? (
            <div className="emptyIllustration">
              <img src={emptyPng} alt="No Asset Found"/>
              <p>There's nothing here yet</p>
            </div>
          ) : (
            laptops.map((laptop) => (
              <tr key={laptop.sn}>
                <td>{laptop.sn}</td>
                <td>{laptop.brand}</td>
                <td>{laptop.model}</td>
                <td>
                  {laptop.status === "Assigned" ? (
                    <div className="status a">Assigned</div>
                  ) : laptop.status === "Unused" ? (
                    <div className="status u">Unused</div>
                  ) : laptop.status === "Damaged" ? (
                    <div className="status d">Damaged</div>
                  ) : laptop.status === "Out of Service" ? (
                    <div className="status oos">Out of Service</div>
                  ) : (
                    <div className="status r">Retired</div>
                  )}
                </td>
                <td>
                  {laptop.username ? (
                    <div className="user">
                      <h4>{laptop.username}</h4>
                      <a href="#">{laptop.useremail}</a>
                    </div>
                  ) : (
                    <div className="user">
                      <h4>N/A</h4>
                      <a href="#">N/A</a>
                    </div>
                  )}
                </td>
                <td>
                  {new Date(laptop.dateadded).toLocaleDateString()} |{" "}
                  {new Date(laptop.dateadded).toLocaleTimeString()}
                </td>
                <td>
                  <button id="assign">Assign</button>
                </td>
                <td>
                  <button id="revoke">Revoke</button>
                </td>
                <td>
                  <i className="far fa-edit" id="edit" onClick={()=>onEdit(laptop)}></i>
                </td>
                <td>
                  <i className="far fa-trash-alt" id="delete"></i>
                </td>
              </tr>
            ))
          )}
        </tbody>

        <tbody class="inactive" id="search-table"></tbody>
      </table>
    </div>
 );
}

// export function TableSupplier() {
//   return (
//     <div class="third-row">
//             <table id="laptops">
//                 <thead>
//                     <th>SN</th>
//                     <th>Brand</th>
//                     <th>Model</th>
//                     <th></th>
//                     <th>User</th>
//                     <th>Date Added</th>
//                     <th></th>
//                     <th></th>
//                     <th></th>
//                     <th></th>
//                 </thead>

//                 <tbody id="main-table">

//                     <div class="loading" id="loading"></div>

//                 </tbody>

//                 <tbody class="inactive" id="search-table">
//                 </tbody>
//             </table>
//         </div>
//   )
// }
