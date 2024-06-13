import React,{useState} from 'react'
import { TitleComponent1 } from '../Components/TitleComponent';
import Table from '../Components/Table';

export default function Users() {
    const [moduleActive, setModuleActive] = useState([
        null,
        "add-active",
      ]);
      const openModule = (state) => {
        setModuleActive(state === moduleActive ? null : state);
      };
      const closeModule = () => {
    setModuleActive(null);
  };

  const [moduleEdit, setModuleEdit] = useState([]);
  const [showEditModule, setShowEditModule] = useState(false);
  const handleEditClick = (monitor) => {
    setShowEditModule(true);
    setModuleEdit(monitor);
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get Users
useEffect(() => {
  async function getUsers() {
    try {
      const response = await fetch(`http://localhost:3300/getUsers`);
      const data = await response.json();
      set(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  getMiscs();
}, []);

  return (
    <section class="main">
    <TitleComponent1 title={'Users'}/>

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

    <Table/>

</section>
  )
}
