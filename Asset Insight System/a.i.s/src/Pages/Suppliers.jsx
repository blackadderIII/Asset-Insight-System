import React, { useEffect, useState } from 'react';
import { TitleComponent1 } from '../Components/TitleComponent';
import { SupplierTable } from '../Components/Table';
import { ModuleSuppliers } from '../Components/module';


export default function Suppliers() {
    
    const [loading, setLoading] = useState(true);

    const [moduleActive, setModuleActive] = useState([
        null,
        "add-active",
      ]);
      const openModule = (state) => {
        setModuleActive(state === moduleActive ? null : state);
      };

      const closeEditModule = () =>{
        setShowEditModule(null)
      }

    const closeModule = () => {
    setModuleActive(null);
  };
    
    const [moduleEdit, setModuleEdit] = useState([]);
    
    const [showEditModule, setShowEditModule] = useState(false);
    const handleEditClick = (supplier) => {
        setShowEditModule(true);
        setModuleEdit(supplier);
    };
    
    const [suppliers,setSuppliers] = useState([]);
    useEffect(()=>{
        async function getSupplierData() {
           const SupplierData = await fetch ('http://localhost:3300/getSuppliers');
           const response = await SupplierData.json()
        
           setSuppliers(response)
           setLoading(false);
        }
        getSupplierData()
    },[])

  return (
    <section class="main">
    <TitleComponent1 title={'Suppliers'}/>

    <div class="second-row">
        <div class="buttons">
            <div class="add-button" onclick="openModule()">
                <i class="fal fa-add"></i>
                <h5>Add</h5>
            </div>
            <div class="add-button" onclick="exportLaptops()">
                <i class="fal fa-file-export"></i>
                <h5>Export</h5>
            </div>
        </div>
        <div class="field">
            <input type="search" id="searchAsset" placeholder="Search..."/>
            <i class="fal fa-search"></i>
        </div>
    </div>

    <SupplierTable data={suppliers} loading={loading} onEdit={handleEditClick}/>


    <ModuleSuppliers
        asset={"Supplier"}
        modulestate={moduleActive}
        onClose={closeModule}
        assetEditState={moduleEdit}
        showEditModule={showEditModule}
        closeEditModule={closeEditModule}
        // refresh={getLaptops()}
      />

</section>
  )
}
