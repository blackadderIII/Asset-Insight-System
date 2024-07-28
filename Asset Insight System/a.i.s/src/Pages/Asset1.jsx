import React, { useState, useEffect,useContext} from "react";
import "../css/Table.css";
import { TitleComponent1 } from "../Components/TitleComponent";
import { ModuleLaptop } from "../Components/module";
import { AssetTable } from "../Components/Table";
import { getLaptops,deleteLaptop,getUsers,exportLaptops,revokeLaptop} from "../lib/moduleLaptop";
import { ToastContext } from "../utils/toastContext";
import "../css/loading.css"

function Asset1() {

  const {errorT,successT,warnT} = useContext(ToastContext)
  const [moduleActive, setModuleActive] = useState(null);
  const [sn,setSn] = useState(null)

  const openModule = (state) => {
    setModuleActive(state);
    const min = 10000;
  const max = 99999;
  const serialNumber = `AISL-${
    Math.floor(Math.random() * (max - min + 1)) + min
  }`;
  // getSuppliers();
  setSn(serialNumber);
  };

  const closeModule = () => {
    setModuleActive(null);
  };

  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

//   const loadingRef = useRef(null);

  useEffect(() => {
    getLaptops().then((data)=>{
      setLaptops(data);
      setLoading(false);
    },
    setTimeout(()=> setLoading(false),3000)
  );
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

const handleDeleteClick = (laptop) => {
  const confrimDelete = window.confirm("Do you want to delete this laptop?");

  if (confrimDelete) {
    deleteLaptop(laptop.sn);
    setTimeout(() => location.reload(), 1000);
    successT("Laptop Deleted Successfully");
    return;
  }
};

const [showAssignModule, setShowAssignModule] = useState(false);
const [userList, setUserList] = useState([]);

const closeAssignModule = () =>{
  setShowAssignModule(false)
}

const openAssignModule = (laptop) => {
  setSn(laptop.sn);
  setShowAssignModule(true);
  getUsers().then((response)=>{
    setUserList(response);
  });
}

const handleRevoke = (laptop) =>{
      revokeLaptop(laptop.sn)
      successT("Laptop revoked successfully");
      setTimeout(() => location.reload(), 1000);
      return
}



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
            <div class="add-button" onClick={() => exportLaptops()}>
              <i class="fal fa-file-export"></i>
              <h5>Export</h5>
            </div>
          </div>
          <div class="field">
            <input type="search" id="searchAsset" placeholder="Search..." />
            <i class="fal fa-search"></i>
          </div>
        </div>

         
          <AssetTable asset={laptops} loading={loading} onEdit={handleEditClick} onDelete={handleDeleteClick} onAssign = {openAssignModule} onRevoke = {handleRevoke}/>
        
      </section>

      <ModuleLaptop
        asset={"Laptop"}
        modulestate={moduleActive}
        serialNumber={sn}
        onClose={closeModule}
        assetEditState={moduleEdit}
        showEditModule={showEditModule}
        closeEditModule={closeEditModule}
        showAssignModule={showAssignModule}
        userList={userList}
        closeAssignModule={closeAssignModule}
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