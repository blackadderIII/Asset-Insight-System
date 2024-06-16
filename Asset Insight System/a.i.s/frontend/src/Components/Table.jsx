import React, { createRef, useState ,useEffect} from "react";
import "../css/Table.css";
import emptyPng from "../Assets/icons/empty.png";

export function AssetTable({ asset, loading, onEdit }) {
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
              <img src={emptyPng} alt="No Asset Found" />
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
                  <i
                    className="far fa-edit"
                    id="edit"
                    onClick={() => onEdit(asset)}
                  ></i>
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
export function UserTable({ data, loading, onEdit }) {
  const loadingRef = createRef();

  const [userasset,setUserAsset] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const getUserAssets = async () => {
        const userAssets = await Promise.all(
          data.map(async (dataItem) => {
            const getUserAssetAPI = await fetch(`http://localhost:3300/getUserAsset/${dataItem.email}`);
            const userAssetData = await getUserAssetAPI.json();
            console.log(userAssetData)
            return userAssetData;
          })
        );
        setUserAsset(userAssets);
      };
      getUserAssets();
    }
  }, [data]);

  if (loading) {
    return <div className="loading" ref={loadingRef}></div>;
  }

  if (data.length === 0) {
    return (
      <div className="emptyIllustration">
        <img src={emptyPng} alt="No Asset Found" />
        <p>There's nothing here yet</p>
      </div>
    );
  }

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
        {data.map((dataItem) => (
            <tr key={dataItem.email}>
              <td>
                {dataItem.username ? (
                  <div className="user">
                    <h4>{dataItem.username}</h4>
                    <a href="#">{dataItem.useremail}</a>
                  </div>
                ) : (
                  <div className="user">
                    <h4>N/A</h4>
                    <a href="#">N/A</a>
                  </div>
                )}
              </td>
              <td>
                {dataItem.phonenumber === null ? (
                  <h4>N/A</h4>
                ) : (
                  <h4>{dataItem.phonenumber}</h4>
                )}
              </td>
              <td>{dataItem.department}</td>
              <td>{dataItem.designation}</td>
              <td>
                {userasset.find((asset) => asset.email === dataItem.email).laptops <
                  1 ? (
                  <div class="asset">
                    <i class="fas fa-laptop" id="empty-asset"></i>
                  </div>
                ) : (
                  <div class="asset">
                    <span>${dataItem.laptops}</span>
                    <i class="fas fa-laptop"></i>
                  </div>
                )}
              </td>
              <td>
                {userasset.find((asset) => asset.email === dataItem.email).phones <
                  1 ? (
                  <div class="asset">
                    <i class="fas fa-mobile-screen" id="empty-asset"></i>
                  </div>
                ) : (
                  <div class="asset">
                    <span>${dataItem.phones}</span>
                    <i class="fas fa-mobile-screen"></i>
                  </div>
                )}
              </td>
              <td>
                <button id="assign">Assign</button>
              </td>
              <td>
                <button id="revoke">Revoke</button>
              </td>
              <td>
                <i
                  className="far fa-edit"
                  id="edit"
                  onClick={() => onEdit(dataItem)}
                ></i>
              </td>
              <td>
                <i className="far fa-trash-alt" id="delete"></i>
              </td>
            </tr>
          ))}
        </tbody>

        <tbody class="inactive" id="search-table"></tbody>
      </table>
    </div>
  );
}

export function SupplierTable({ data, loading, onEdit }) {
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
              <img src={emptyPng} alt="No Asset Found" />
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
                  <i
                    className="far fa-edit"
                    id="edit"
                    onClick={() => onEdit(data)}
                  ></i>
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
