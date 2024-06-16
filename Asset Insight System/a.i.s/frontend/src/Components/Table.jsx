import React, { createRef ,useState} from "react";
import "../css/Table.css";
import emptyPng from "../Assets/icons/empty.png";

export  function AssetTable({ asset,loading,onEdit}) {
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
          ) : asset.length === 0 ? (
            <div className="emptyIllustration">
              <img src={emptyPng} alt="No Asset Found"/>
              <p>There's nothing here yet</p>
            </div>
          ) : (
            asset.map((asset) => (
              <tr key={asset.sn}>
                <td>{asset.sn}</td>
                <td>{asset.brand}</td>
                <td>{asset.model}</td>
                <td>
                  {asset.status === "Assigned" ? (
                    <div className="status a">Assigned</div>
                  ) : asset.status === "Unused" ? (
                    <div className="status u">Unused</div>
                  ) : asset.status === "Damaged" ? (
                    <div className="status d">Damaged</div>
                  ) : asset.status === "Out of Service" ? (
                    <div className="status oos">Out of Service</div>
                  ) : (
                    <div className="status r">Retired</div>
                  )}
                </td>
                <td>
                  {asset.username ? (
                    <div className="user">
                      <h4>{asset.username}</h4>
                      <a href="#">{asset.useremail}</a>
                    </div>
                  ) : (
                    <div className="user">
                      <h4>N/A</h4>
                      <a href="#">N/A</a>
                    </div>
                  )}
                </td>
                <td>
                  {new Date(asset.dateadded).toLocaleDateString()} |{" "}
                  {new Date(asset.dateadded).toLocaleTimeString()}
                </td>
                <td>
                  <button id="assign">Assign</button>
                </td>
                <td>
                  <button id="revoke">Revoke</button>
                </td>
                <td>
                  <i className="far fa-edit" id="edit" onClick={()=>onEdit(asset)}></i>
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
export function UserTable({ data,loading,onEdit}) {
  const loadingRef = createRef();
 
  
  return (
    <div class="third-row">
      <table id="laptops">
        <thead>
          <th>User</th>
          <th>Phone No.</th>
          <th>Department</th>
          <th>Designation</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </thead>

        <tbody id="main-table">
          {loading ? (
            <div className="loading" ref={loadingRef}></div>
          ) : data.length === 0 ? (
            <div className="emptyIllustration">
              <img src={emptyPng} alt="No Asset Found"/>
              <p>There's nothing here yet</p>
            </div>
          ) : (
            data.map((data) => (
              <tr key={data.email}>
              <td>
                  {data.username ? (
                    <div className="user">
                      <h4>{data.username}</h4>
                      <a href="#">{data.useremail}</a>
                    </div>
                  ) : (
                    <div className="user">
                      <h4>N/A</h4>
                      <a href="#">N/A</a>
                    </div>
                  )}
                </td>
                <td>if {data.phonenumber === null ? (<div className="phonenum">
                      <h4>N/A</h4>
                    </div>):(<div className="phonenum">
                      <h4>{data.phonenumber}</h4>
                    </div>)}  
            </td>
                <td>{data.department}</td>
                <td>
                 
                </td>
                
                <td>
                  {new Date(data.dateadded).toLocaleDateString()} |{" "}
                  {new Date(data.dateadded).toLocaleTimeString()}
                </td>
                <td>
                  <button id="assign">Assign</button>
                </td>
                <td>
                  <button id="revoke">Revoke</button>
                </td>
                <td>
                  <i className="far fa-edit" id="edit" onClick={()=>onEdit(data)}></i>
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

export function SupplierTable({ data,loading,onEdit}) {
  const loadingRef = createRef();
 
  
  return (
    <div class="third-row">
      <table id="laptops">
        <thead>
          <th>Supplier</th>
          <th>Phone No.</th>
          <th>Location</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </thead>

        <tbody id="main-table">
          {loading ? (
            <div className="loading" ref={loadingRef}></div>
          ) : data.length === 0 ? (
            <div className="emptyIllustration">
              <img src={emptyPng} alt="No Asset Found"/>
              <p>There's nothing here yet</p>
            </div>
          ) : (
            data.map((data) => (
              <tr key={data.sn}>
                <td>{data.sn}</td>
                <td>{data.brand}</td>
                <td>{data.model}</td>
                <td>
                  {data.status === "Assigned" ? (
                    <div className="status a">Assigned</div>
                  ) : data.status === "Unused" ? (
                    <div className="status u">Unused</div>
                  ) : data.status === "Damaged" ? (
                    <div className="status d">Damaged</div>
                  ) : data.status === "Out of Service" ? (
                    <div className="status oos">Out of Service</div>
                  ) : (
                    <div className="status r">Retired</div>
                  )}
                </td>
                <td>
                  {data.username ? (
                    <div className="user">
                      <h4>{data.username}</h4>
                      <a href="#">{data.useremail}</a>
                    </div>
                  ) : (
                    <div className="user">
                      <h4>N/A</h4>
                      <a href="#">N/A</a>
                    </div>
                  )}
                </td>
                <td>
                  {new Date(data.dateadded).toLocaleDateString()} |{" "}
                  {new Date(data.dateadded).toLocaleTimeString()}
                </td>
                <td>
                  <button id="assign">Assign</button>
                </td>
                <td>
                  <button id="revoke">Revoke</button>
                </td>
                <td>
                  <i className="far fa-edit" id="edit" onClick={()=>onEdit(data)}></i>
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