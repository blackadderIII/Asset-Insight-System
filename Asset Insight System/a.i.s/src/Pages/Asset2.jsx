import React, { useState,useEffect } from "react";
import "../css/Table.css";
import { AssetTable } from '../Components/Table';
import { TitleComponent1 } from "../Components/TitleComponent";
import { ModulePhone } from "../Components/module";
import { getPhones,deletePhone,getUsers,exportPhones,revokePhone,getThresh} from "../lib/modulePhone";
import { ToastContext } from "../utils/toastContext";


function Asset2() {
  const [moduleActive, setModuleActive] = useState([
    null,
    "add-active",
    "edit-active",
  ]);
  const [sn,setSn] = useState(null)
  
  const openModule = (state) => {
    setModuleActive(state);
    const min = 10000;
  const max = 99999;
  const serialNumber = `AISP-${
    Math.floor(Math.random() * (max - min + 1)) + min
  }`;
  // getSuppliers();
  setSn(serialNumber);
  };

  const closeModule = () => {
    setModuleActive(null);
  };



  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const loadingRef = useRef(null);

//get phones 
useEffect(() => {
  getPhones().then((data)=>{
    setPhones(data);
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

const handleEditClick = (phone) => {
  setShowEditModule(true);
  setModuleEdit(phone);
};

  return (
    <>
      <section class="main">
        <TitleComponent1 title={"Phones"} />

        <div class="second-row">
          <div class="buttons">
            <div class="add-button" onClick={
                ()=>openModule("add-active")}>
              <i class="fal fa-add"></i>
              <h5>Add</h5>
            </div>
            <div class="add-button" onClick={()=>openModule("edit-active")}>
              <i class="fal fa-edit"></i>
              <h5>Edit</h5>
            </div>
            <div class="add-button" onclick="exportPhones()">
              <i class="fal fa-file-export"></i>
              <h5>Export</h5>
            </div>
          </div>
          <div class="field">
            <input type="search" id="searchAsset" placeholder="Search..." />
            <i class="fal fa-search"></i>
          </div>
        </div>

        <AssetTable asset={phones} loading={loading} onEdit={handleEditClick}/>
        
      </section>
      <ModulePhone
        asset={"Phone"}
        modulestate={moduleActive}
        onClose={closeModule}
        assetEditState={moduleEdit}
        showEditModule={showEditModule}
        closeEditModule={closeEditModule}
      />
    </>
  );
}

export default Asset2;
