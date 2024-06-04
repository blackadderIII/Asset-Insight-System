import React from 'react';
import '../css/Table.css'
import Table from '../Components/Table';
import {TitleComponent1} from '../Components/TitleComponent';
import { ModuleMNP } from '../Components/module';

function Asset4() {
    const [moduleActive,setModuleActive] = useState([null,"add-active","edit-active"]);

    const openModule = (state) =>{
        setModuleActive(
          state  === moduleActive ? null : state
        ) 
    }

    const closeModule = () => {
        setModuleActive(null);
      };


const [moduleEdit,setModuleEdit] = useState([]);

const [showEditModule, setShowEditModule] = useState(false);
const closeEditModule = () =>{
    setShowEditModule(null)
  }

const handleEditClick = (monitor) => {
  setShowEditModule(true);
  setModuleEdit(monitor);
};

const [Ndevices, setNdevices] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// get Network devices
useEffect(() => {
  async function getNdevices() {
    try {
      const response = await fetch(`http://localhost:3300/getNetworks`);
      const data = await response.json();
      setNdevices(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  getNdevices();
}, []);
  return (
    <section class="main">
        <TitleComponent1 title={'Network Devices'}/>

        <div class="second-row">
        <div class="buttons">
                <div class="add-button" onClick={()=>openModule('add-active')}>
                    <i class="fal fa-add"></i>
                    <h5>Add</h5>
                </div>
                <div class="add-button" onClick={()=>openModule('edit-active')}>
                    <i class="fal fa-edit"></i>
                    <h5>Edit</h5>
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

        <Table asset={Ndevices} loading={loading} onEdit={handleEditClick}/>

        <ModuleMNP asset={"Network Devices"} modulestate={moduleActive} onClose={closeModule} assetEditState={moduleEdit}
        showEditModule={showEditModule}
        closeEditModule={closeEditModule}/>


    </section>
  )
}

export default Asset4
