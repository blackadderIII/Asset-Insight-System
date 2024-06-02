import React, { useState, useEffect} from "react";
import "../css/Table.css";
import { TitleComponent1 } from "../Components/TitleComponent";
import { ModuleLaptop } from "../Components/module";
import Table from "../Components/Table";
import "../css/loading.css"

function Asset1() {
  const [moduleActive, setModuleActive] = useState(null);

  const openModule = (state) => {
    setModuleActive(state);
  };

  const closeModule = () => {
    setModuleActive(null);
  };

  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const loadingRef = useRef(null);

  useEffect(() => {
    async function getLaptops() {
      try {
        const response = await fetch(`http://localhost:3300/getlaptops`);
        const data = await response.json();
        setLaptops(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    getLaptops();
  }, []);

  const [moduleEdit,setModuleEdit] = useState([]);

  const [showEditModule, setShowEditModule] = useState(false);
  const closeEditModule = () =>{
    setShowEditModule(null)
  }

const handleEditClick = (laptop) => {
  setShowEditModule(true);
  setModuleEdit(laptop);
};
  return (
    <>
      <section class="main">
        <TitleComponent1 title={"Laptops"} />

        <div class="second-row">
          <div class="buttons">
            <div class="add-button" onClick={() => openModule("add-active")}>
              <i class="fal fa-add"></i>
              <h5>Add</h5>
            </div>
            <div class="add-button" onClick={() => openModule("edit-active")}>
              <i class="fal fa-edit"></i>
              <h5>Edit</h5>
            </div>
            <div class="add-button" onclick="exportLaptops()">
              <i class="fal fa-file-export"></i>
              <h5>Export</h5>
            </div>
          </div>
          <div class="field">
            <input type="search" id="searchAsset" placeholder="Search..." />
            <i class="fal fa-search"></i>
          </div>
        </div>

         
          <Table asset={laptops} loading={loading} onEdit={handleEditClick}/>
        
      </section>

      <ModuleLaptop
        asset={"Laptop"}
        modulestate={moduleActive}
        onClose={closeModule}
        assetEditState={moduleEdit}
        showEditModule={showEditModule}
        closeEditModule={closeEditModule}
      />
      
    </>
  );
}

export default Asset1;




//   const renderTableRows = () => {
    // return laptops.map((laptop) => (
    //   <tr key={laptop.sn}>
    //     <td>{laptop.sn}</td>
    //     <td>{laptop.brand}</td>
    //     <td>{laptop.model}</td>
    //     <td>
    //       {laptop.status === "Assigned" ? (
    //         <div className="status a">Assigned</div>
    //       ) : laptop.status === "Unused" ? (
    //         <div className="status u">Unused</div>
    //       ) : laptop.status === "Damaged" ? (
    //         <div className="status d">Damaged</div>
    //       ) : laptop.status === "Out of Service" ? (
    //         <div className="status oos">Out of Service</div>
    //       ) : (
    //         <div className="status r">Retired</div>
    //       )}
    //     </td>
    //     <td>
    //       {laptop.username ? (
    //         <div className="user">
    //           <h4>{laptop.username}</h4>
    //           <a href="#">{laptop.useremail}</a>
    //         </div>
    //       ) : (
    //         <div className="user">
    //           <h4>N/A</h4>
    //           <a href="#">N/A</a>
    //         </div>
    //       )}
    //     </td>
    //     <td>
    //       {new Date(laptop.dateadded).toLocaleDateString()} |{" "}
    //       {new Date(laptop.dateadded).toLocaleTimeString()}
    //     </td>
    //     <td>
    //       <button id="assign">Assign</button>
    //     </td>
    //     <td>
    //       <button id="revoke">Revoke</button>
    //     </td>
    //     <td>
    //       <i className="far fa-edit" id="edit"></i>
    //     </td>
    //     <td>
    //       <i className="far fa-trash-alt" id="delete"></i>
    //     </td>
    //   </tr>
    // ));
//   };

//   useEffect(() => {
//     if (loadingRef.current) {
//       loadingRef.current.style.display = "none";
//     }
//   }, [loading]);