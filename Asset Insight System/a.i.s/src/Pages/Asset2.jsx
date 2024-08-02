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

  const openModule = (state) => {
    setModuleActive(state === moduleActive ? null : state);
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
    async function getPhones() {
      try {
        const response = await fetch(`http://localhost:3300/getPhones`);
        const data = await response.json();
        setPhones(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    getPhones();
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
