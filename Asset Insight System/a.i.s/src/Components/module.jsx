import React, {  useEffect, useState, useContext } from "react";
import "../css/module.css";
import "../lib/moduleLaptop";
import { ToastContext } from "../utils/toastContext";

export function ModuleLaptop({
  asset,
  modulestate,
  serialNumber,
  onClose,
  assetEditState,
  showEditModule,
  closeEditModule,
  showAssignModule,
  userList,
  closeAssignModule,
  threshInfo
}) {
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };

  const handleAssignClose = () => {
    closeAssignModule();
  };



  const { errorT, successT, warnT } = useContext(ToastContext);

  const user = localStorage.getItem("username");

  //------------------------------------------------------
  const [loading, setLoading] = useState(false);

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [processor, setProcessor] = useState(null);
  const [ram, setRam] = useState(null);
  const [rom, setRom] = useState(null);
  const [comment, setComment] = useState(null);
  const [assignedUser, setAssignedUser] = useState({ value: null, text: null });

  // -----------------------------------------------------

  async function addLaptop() {
    setLoading(true);
    try {
      const addLaptopAPI = await fetch("http://localhost:3300/addLaptop", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          sn: serialNumber,
          brand: brand,
          model: model,
          processor: processor,
          ram: ram,
          rom: rom,
          comment: comment,
          addedby: user,
        }),
      });

      const response = await addLaptopAPI.json();

      if (response.message === "Error Executing Query") {
        errorT("An error occured. please try again later.");
        setLoading(false);
        return;
      }

      if (response.message === "Error adding laptop") {
        errorT("An error occured. please try again later.");
        setLoading(false);
        return;
      }

      setLoading(false);
      handleClose();
      setBrand("");
      setModel("");
      setProcessor("");
      setRam("");
      setRom("");
      setComment("");
      setTimeout(() => location.reload(), 1000);
      successT("Laptop added successfully!");
    } catch (error) {
      errorT("An error occured. please try again later.");
      setLoading(false)
    }
  }
// -----------------------------------------------------
  const[laptopInfo,setLaptopInfo]= useState({
    sn:'',
    status:'',
    brand: '',
    model:'',
    processor: '',
    ram: '',
    rom: '',
    comment: '',
  })

 useEffect(()=>{
  setLaptopInfo(assetEditState)
 },[assetEditState])

 const setNewStatus = (status) =>{
  setLaptopInfo({...laptopInfo,status})
 }
  const setNewBrand = (brand) =>  {
    setLaptopInfo({ ...laptopInfo, brand });
  }
  const setNewModel = (model) =>  {
    setLaptopInfo({ ...laptopInfo, model });
  }
  const setNewProcessor = (processor) =>  {
    setLaptopInfo({ ...laptopInfo, processor });
  }
  const setNewRam = (ram) =>  {
    setLaptopInfo({ ...laptopInfo, ram });
  }
  const setNewRom = (rom) =>  {
    setLaptopInfo({ ...laptopInfo, rom });
  }
  const setNewComment = (comment) =>  {
    setLaptopInfo({ ...laptopInfo, comment });
  }
  


// ----------------------------------------------------
  async function saveLaptopInfo(laptopInfo) {
    setLoading(true);
    try {
      const saveLaptopAPI = await fetch("http://localhost:3300/saveLaptop", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          sn: laptopInfo.sn,
          status:laptopInfo.status,
          brand: laptopInfo.brand,
          model: laptopInfo.model,
          processor: laptopInfo.processor,
          ram: laptopInfo.ram,
          rom: laptopInfo.rom,
          comment: laptopInfo.comment,
          addedby: user,
        }),
      });

      const response = await saveLaptopAPI.json();

      if (response.message === "Error Executing Query") {
        errorT("An error occured. please try again later.");
        setLoading(false);
        return;
      }

      if (response.message === "Error adding laptop") {
        errorT("An error occured. please try again later.");
        setLoading(false);
        return;
      }

      setLoading(false);
      handleEditClose();
      setTimeout(() => location.reload(), 1000);
      successT("Laptop Info. saved successfully!");
    } catch (error) {
      errorT("An error occured. please try again later.");
      setLoading(false)
    }
  }


//-----------------------------------------------------

// save assigned Laptop
async function assignLaptop() {
  try {
    setLoading(true)
    const assign = await fetch("http://localhost:3300/assign", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        sn: serialNumber,
        username: assignedUser.text,
        useremail: assignedUser.value,
      }),
    });
    const response = await assign.json();

    if (response.message === "Error executing query") {
      errorT("An error occured. Please try again later");
      return;
    }
    setLoading(false)
    successT("Laptop assigned successfully");
    handleAssignClose()
    setTimeout(() => location.reload(), 1000);
    return;
  } catch (error) {
    console.log("Error assigning laptop", error);
    setLoading(false)
    errorT("Can't reach servers. Please try again later");
    return;
  }
}

// ---------------------------------------------------------


const [newThresh,setnewThresh] =useState({
  category:'',
  minimumthreshold:'',
  maximumthreshold:''
})

useEffect(()=>{
  setnewThresh(threshInfo)
},[threshInfo])

const setNewMinThresh = (minimumthreshold) =>{
  setnewThresh({...newThresh,minimumthreshold})
}
const setNewMaxThresh = (maximumthreshold) =>{
  setnewThresh({...newThresh,maximumthreshold})
}


const saveThresh = async () =>{

      setLoading(true)
      const saveThreshAPI = await fetch('http://localhost:3300/saveThresh',{
        method: "POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          category: newThresh.category,
          minThresh:newThresh.minimumthreshold,
          maxThresh: newThresh.maximumthreshold
        }
        )
      })
      const response = await saveThreshAPI.json()

      if (response.message==="Error saving threshold"){
        errorT("Error saving threshold")
        setLoading(false)
      }
    
      successT("Threshold Values Saved")
      setLoading(false)
}


  return (
    <div>
      {/* Add Laptop */}
      <div
        className={`module ${modulestate === "add-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Add {asset}</h2>
        </div>

        <div class="field">
          <label for="SN">*Serial Number</label>
          <input
            type="text"
            name="SN"
            id="SN-module"
            readonly
            required
            value={serialNumber}
          />
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="brand-module"
            placeholder="eg. HP"
            required
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="model-module"
            placeholder={`Enter the ${asset}'s model`}
            required
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="processor">Processor</label>
          <input
            type="text"
            name="processor"
            id="processor-module"
            placeholder={`Enter the ${asset}'s processor spec`}
            onChange={(e) => setProcessor(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="ram-module"
            placeholder={`Enter the ${asset}'s RAM spec`}
            onChange={(e) => setRam(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="hardDrive-module"
            placeholder={`Enter the ${asset}'s Storage Capacity`}
            onChange={(e) => setRom(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder={`Enter the ${asset}'s Supplier name.`}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea
            name="comment"
            id="comment-module"
            rows="5"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div class="button-module">
          {loading ? (
            <button
              id="addLaptop"
              onClick={() => {
                addLaptop();
              }}
            >
              <div className="loading-mini"></div>
            </button>
          ) : (
            <button
              id="addLaptop"
              onClick={() => {
                addLaptop();
              }}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Edit Laptop Asset Category */}
      <div
        className={`module ${modulestate === "edit-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Edit {asset} category</h2>
        </div>

        <div class="field">
          <label for="MinThresh">Input Minimum Threshold Value</label>
          <input type="text" name="minT" id="minThresh-module"
          placeholder="Enter Minimum Threshold Value" value={newThresh.minimumthreshold} required onChange={(e)=>setNewMinThresh(e.target.value)}/>
        </div>

        <div class="field">
          <label for="MaxThresh">Input Maximum Threshold Value</label>
          <input
            type="text"
            name="maxT"
            id="maxThresh-module"
            placeholder="Enter Maximum Threshold Value"
            required
            value={newThresh.maximumthreshold}
            onChange={(e)=>{setNewMaxThresh(e.target.value)}}
          />
        </div>

        <div class="button-module">
          <button id="addLaptop" onClick={()=>saveThresh()}>
           {loading?(<div className="loading-mini"></div>):('Save')}
          </button>
        </div>
      </div>

      {/* edit laptops*/}

      <div
        className={`module ${showEditModule ? "active" : ""}`}
        id="editModule"
      >
        <i class="fas fa-x" onClick={() => handleEditClose()}></i>

        <div class="field">
          <h2>Edit {asset} Information</h2>
        </div>

        <div class="status-field">
          <h4 id="SN-Display">{laptopInfo.sn}</h4>
          <div class="status" id="laptop-status">
            {laptopInfo.status === "Assigned" ? (
              <div className="status a">Assigned</div>
            ) : laptopInfo.status === "Unused" ? (
              <div className="status u">Unused</div>
            ) : laptopInfo.status === "Damaged" ? (
              <div className="status d">Damaged</div>
            ) : laptopInfo.status === "Out of Service" ? (
              <div className="status oos">Out of Service</div>
            ) : (
              <div className="status r">Retired</div>
            )}
          </div>
        </div>

        <div class="field">
          <label for="status">Status</label>
          <select
            name="status"
            id="edit-status-module"
            value={laptopInfo.status}
            onChange={(e)=>{const selectedStatus = e.target.options[e.target.selectedIndex]
              setNewStatus(selectedStatus.value)}}
          >
            <option value="" disabled selected hidden>
              Select a Status
            </option>
            <option value="Assigned" hidden disabled>
              Assigned
            </option>
            <option value="Unused">Unused</option>
            <option value="Retired">Retired</option>
            <option value="Damaged">Damaged</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="edit-brand-module"
            placeholder="eg. HP"
            required
            value={laptopInfo.brand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="edit-model-module"
            placeholder="Enter the laptop's model"
            required
            value={laptopInfo.model}
            onChange={(e) => setNewModel(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="processor">Processor</label>
          <input
            type="text"
            name="processor"
            id="edit-processor-module"
            placeholder="Enter the laptop's processor spec"
            value={laptopInfo.processor}
            onChange={(e) => setNewProcessor(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="edit-ram-module"
            placeholder="Enter the laptop's RAM spec"
            value={laptopInfo.ram}
            onChange={(e) => setNewRom(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="edit-rom-module"
            placeholder="Enter the laptop's RAM spec"
            value={laptopInfo.rom}
            onChange={(e) => setNewRam(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder="Enter the laptop's Supplier name."
            value={
              laptopInfo.suppliername === null
                ? ""
                : laptopInfo.suppliername
            }
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea
            name="comment"
            id="edit-comment-module"
            rows="5"
            value={laptopInfo.comment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>

        <div class="button-module">
        {loading ? (
            <button
              id="saveLaptopBtn"
              onClick={() => {
                addLaptop();
              }}
            >
              <div className="loading-mini"></div>
            </button>
          ) : (<button id="saveLaptopBtn" onClick={()=>saveLaptopInfo(laptopInfo)}>
            Save
          </button>)}
        </div>
      </div>

      {/* Assign Asset */}
      <div class={`module ${showAssignModule ? "active" : ""} `} id="assignModule">
        <i class="fas fa-x" onClick={() => handleAssignClose()}></i>

        <div class="field">
          <h2>Assign {asset}</h2>
        </div>

        <div class="field">
          <label for="status">Users</label>
          <select
            name="status"
            className="users-dropdown"
            id="users-dropdown"
            multiple
            onChange={(e)=> {const selectedOption = e.target.options[e.target.selectedIndex];
              setAssignedUser({ value: selectedOption.value, text: selectedOption.text })}}
          >
            <option value="" disabled selected hidden>
              Select a User
            </option>
            {userList.map((user)=>
            (<option key={user.email} value={user.email}>
              {user.username}
            </option>))}
          </select>

        </div>

        <div class="button-module">
          <button id="assignLaptopBtn" onClick={()=>assignLaptop()}>
            {loading ? <div className="loading-mini"></div> : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModulePhone({
  asset,
  modulestate,
  onClose,
  assetEditState,
  showEditModule,
  closeEditModule,
  showAssignModule,
  userList,
  closeAssignModule,
  threshInfo
}) {
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };

   const handleAssignClose = () => {
    closeAssignModule();
  };

  
  const { errorT, successT, warnT } = useContext(ToastContext);

  const user = localStorage.getItem("username");

  const [loading, setLoading] = useState(false);

  
  const [brand, setBrand] = useState(null);
  
  return (
    <div>
      {/* Add Phone */}
      <div
        className={`module ${modulestate === "add-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Add {asset}</h2>
        </div>

        <div class="field">
          <label for="SN">*Serial Number</label>
          <input type="text" name="SN" id="SN-module" readonly required />
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="brand-module"
            placeholder="eg. HP"
            required
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="model-module"
            placeholder={`Enter the ${asset}'s model`}
            required
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="ram-module"
            placeholder={`Enter the ${asset}'s RAM spec`}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Phone Space Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="hardDrive-module"
            placeholder={`Enter the ${asset}'s Storage Capacity`}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder={`Enter the ${asset}'s Supplier name.`}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea name="comment" id="comment-module" rows="5"></textarea>
        </div>

        <div class="button-module">
          <button id="addLaptop" onclick="addLaptop()">
            Add
          </button>
        </div>
      </div>

      {/* Edit Phone Asset Category */}
      <div
        className={`module ${modulestate === "edit-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Edit {asset} category</h2>
        </div>

        <div class="field">
          <label for="MinThresh">Input Minimum Threshold Value</label>
          <input type="text" name="minT" id="minThresh-module" required />
        </div>

        <div class="field">
          <label for="MaxThresh">Input Maximum Threshold Value</label>
          <input
            type="text"
            name="maxT"
            id="maxThresh-module"
            placeholder=""
            required
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea name="comment" id="comment-module" rows="5"></textarea>
        </div>

        <div class="button-module">
          <button id="addLaptop" onclick="addLaptop()">
            Add
          </button>
        </div>
      </div>

      {/* edit MNP*/}
      <div
        className={`module ${showEditModule ? "active" : ""}`}
        id="editModule"
      >
        <i class="fas fa-x" onClick={() => handleEditClose()}></i>

        <div class="field">
          <h2>Edit {asset} Information</h2>
        </div>

        <div class="status-field">
          <h4 id="SN-Display">{assetEditState.sn}</h4>
          <div class="status" id="laptop-status">
            {assetEditState.status === "Assigned" ? (
              <div className="status a">Assigned</div>
            ) : assetEditState.status === "Unused" ? (
              <div className="status u">Unused</div>
            ) : assetEditState.status === "Damaged" ? (
              <div className="status d">Damaged</div>
            ) : assetEditState.status === "Out of Service" ? (
              <div className="status oos">Out of Service</div>
            ) : (
              <div className="status r">Retired</div>
            )}
          </div>
        </div>

        <div class="field">
          <label for="status">Status</label>
          <select
            name="status"
            id="edit-status-module"
            value={assetEditState.status}
          >
            <option value="" disabled selected hidden>
              Select a Status
            </option>
            <option value="Assigned" hidden disabled>
              Assigned
            </option>
            <option value="Unused">Unused</option>
            <option value="Retired">Retired</option>
            <option value="Damaged">Damaged</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="edit-brand-module"
            placeholder="eg. HP"
            required
            value={assetEditState.brand}
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="edit-model-module"
            placeholder="Enter the laptop's model"
            required
            value={assetEditState.model}
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="edit-ram-module"
            placeholder="Enter the laptop's RAM spec"
            value={assetEditState.ram}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="edit-rom-module"
            placeholder="Enter the laptop's RAM spec"
            value={assetEditState.rom}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder="Enter the laptop's Supplier name."
            value={assetEditState.supplier}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea
            name="comment"
            id="edit-comment-module"
            rows="5"
            value={assetEditState.comment}
          />
        </div>

        <div class="button-module">
          <button id="saveLaptopBtn" onclick="saveLaptopInfo()">
            Save
          </button>
        </div>
      </div>

      {/* Assign Asset */}
      <div class="module" id="assignModule">
        <i class="fas fa-x" onclick="closeAssignModule()"></i>

        <div class="field">
          <h2>Assign {asset}</h2>
        </div>

        <div class="field">
          <label for="status">Users</label>
          <select
            name="status"
            class="users-dropdown"
            id="users-dropdown"
            multiple
          >
            <option value="" disabled selected hidden>
              Select a User
            </option>
          </select>
        </div>

        <div class="button-module">
          <button id="assignLaptopBtn" onclick="assignLaptop()">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModuleMNP({
  asset,
  modulestate,
  onClose,
  assetEditState,
  showEditModule,
  closeEditModule,
}) {
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };
  return (
    <div>
      {/* Add Laptop */}
      <div
        className={`module ${modulestate === "add-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Add {asset}</h2>
        </div>

        <div class="field">
          <label for="SN">*Serial Number</label>
          <input type="text" name="SN" id="SN-module" readonly required />
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="brand-module"
            placeholder="eg. HP"
            required
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="model-module"
            placeholder={`Enter the ${asset}'s model`}
            required
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder={`Enter the ${asset}'s Supplier name.`}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea name="comment" id="comment-module" rows="5"></textarea>
        </div>

        <div class="button-module">
          <button id="addLaptop" onclick="addLaptop()">
            Add
          </button>
        </div>
      </div>

      {/* Edit Asset Category */}
      <div
        className={`module ${modulestate === "edit-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Edit {asset} category</h2>
        </div>

        <div class="field">
          <label for="MinThresh">Input Minimum Threshold Value</label>
          <input type="text" name="minT" id="minThresh-module" required />
        </div>

        <div class="field">
          <label for="MaxThresh">Input Maximum Threshold Value</label>
          <input
            type="text"
            name="maxT"
            id="maxThresh-module"
            placeholder=""
            required
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea name="comment" id="comment-module" rows="5"></textarea>
        </div>

        <div class="button-module">
          <button id="addLaptop" onclick="addLaptop()">
            Add
          </button>
        </div>
      </div>

      {/* edit MNP*/}
      <div
        className={`module ${showEditModule ? "active" : ""}`}
        id="editModule"
      >
        <i class="fas fa-x" onClick={() => handleEditClose()}></i>

        <div class="field">
          <h2>Edit {asset} Information</h2>
        </div>

        <div class="status-field">
          <h4 id="SN-Display">{assetEditState.sn}</h4>
          <div class="status" id="laptop-status">
            {assetEditState.status === "Assigned" ? (
              <div className="status a">Assigned</div>
            ) : assetEditState.status === "Unused" ? (
              <div className="status u">Unused</div>
            ) : assetEditState.status === "Damaged" ? (
              <div className="status d">Damaged</div>
            ) : assetEditState.status === "Out of Service" ? (
              <div className="status oos">Out of Service</div>
            ) : (
              <div className="status r">Retired</div>
            )}
          </div>
        </div>

        <div class="field">
          <label for="status">Status</label>
          <select
            name="status"
            id="edit-status-module"
            value={assetEditState.status}
          >
            <option value="" disabled selected hidden>
              Select a Status
            </option>
            <option value="Assigned" hidden disabled>
              Assigned
            </option>
            <option value="Unused">Unused</option>
            <option value="Retired">Retired</option>
            <option value="Damaged">Damaged</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="edit-brand-module"
            placeholder="eg. HP"
            required
            value={assetEditState.brand}
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="edit-model-module"
            placeholder="Enter the laptop's model"
            required
            value={assetEditState.model}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder="Enter the laptop's Supplier name."
            value={assetEditState.supplier}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea
            name="comment"
            id="edit-comment-module"
            rows="5"
            value={assetEditState.comment}
          />
        </div>

        <div class="button-module">
          <button id="saveLaptopBtn" onclick="saveLaptopInfo()">
            Save
          </button>
        </div>
      </div>

      {/* Assign Asset */}
      <div class="module" id="assignModule">
        <i class="fas fa-x" onclick="closeAssignModule()"></i>

        <div class="field">
          <h2>Assign {asset}</h2>
        </div>

        <div class="field">
          <label for="status">Users</label>
          <select
            name="status"
            class="users-dropdown"
            id="users-dropdown"
            multiple
          >
            <option value="" disabled selected hidden>
              Select a User
            </option>
          </select>
        </div>

        <div class="button-module">
          <button id="assignLaptopBtn" onclick="assignLaptop()">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModuleUsers({
  asset,
  modulestate,
  onClose,
  assetEditState,
  showEditModule,
  closeEditModule,
}) {
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };
  return (
    <div>
      {/* Add Users */}
      <div
        className={`module ${modulestate === "add-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Add {asset}</h2>
        </div>

        <div class="field">
          <label for="SN">*Serial Number</label>
          <input type="text" name="SN" id="SN-module" readonly required />
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="brand-module"
            placeholder="eg. HP"
            required
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="model-module"
            placeholder={`Enter the ${asset}'s model`}
            required
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="ram-module"
            placeholder={`Enter the ${asset}'s RAM spec`}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Phone Space Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="hardDrive-module"
            placeholder={`Enter the ${asset}'s Storage Capacity`}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder={`Enter the ${asset}'s Supplier name.`}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea name="comment" id="comment-module" rows="5"></textarea>
        </div>

        <div class="button-module">
          <button id="addLaptop" onclick="addLaptop()">
            Add
          </button>
        </div>
      </div>

      {/* edit Users*/}
      <div
        className={`module ${showEditModule ? "active" : ""}`}
        id="editModule"
      >
        <i class="fas fa-x" onClick={() => handleEditClose()}></i>

        <div class="field">
          <h2>Edit {asset} Information</h2>
        </div>

        <div class="status-field">
          <h4 id="SN-Display">{assetEditState.sn}</h4>
          <div class="status" id="laptop-status">
            {assetEditState.status === "Assigned" ? (
              <div className="status a">Assigned</div>
            ) : assetEditState.status === "Unused" ? (
              <div className="status u">Unused</div>
            ) : assetEditState.status === "Damaged" ? (
              <div className="status d">Damaged</div>
            ) : assetEditState.status === "Out of Service" ? (
              <div className="status oos">Out of Service</div>
            ) : (
              <div className="status r">Retired</div>
            )}
          </div>
        </div>

        <div class="field">
          <label for="status">Status</label>
          <select
            name="status"
            id="edit-status-module"
            value={assetEditState.status}
          >
            <option value="" disabled selected hidden>
              Select a Status
            </option>
            <option value="Assigned" hidden disabled>
              Assigned
            </option>
            <option value="Unused">Unused</option>
            <option value="Retired">Retired</option>
            <option value="Damaged">Damaged</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div class="field">
          <label for="brand">*Brand</label>
          <input
            type="text"
            name="brand"
            id="edit-brand-module"
            placeholder="eg. HP"
            required
            value={assetEditState.brand}
          />
        </div>

        <div class="field">
          <label for="model">*Model</label>
          <input
            type="text"
            name="model"
            id="edit-model-module"
            placeholder="Enter the laptop's model"
            required
            value={assetEditState.model}
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="edit-ram-module"
            placeholder="Enter the laptop's RAM spec"
            value={assetEditState.ram}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="edit-rom-module"
            placeholder="Enter the laptop's RAM spec"
            value={assetEditState.rom}
          />
        </div>

        <div class="field">
          <label for="supplier">Supplied By</label>
          <input
            type="text"
            name="supplier"
            id="supplier-module"
            placeholder="Enter the laptop's Supplier name."
            value={assetEditState.supplier}
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea
            name="comment"
            id="edit-comment-module"
            rows="5"
            value={assetEditState.comment}
          />
        </div>

        <div class="button-module">
          <button id="saveLaptopBtn" onclick="saveLaptopInfo()">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModuleSuppliers({
  asset,
  modulestate,
  onClose,
  assetEditState,
  showEditModule,
  closeEditModule,
}) {
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };
  return (
    <div>
      {/* Add Supplier */}
      <div
        className={`module ${modulestate === "add-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onClick={() => handleClose()}></i>

        <div class="field">
          <h2>Add {asset}</h2>
        </div>
        <div class="field">
          <label for="supplier">*Supplier Name</label>
          <input
            type="text"
            name="suppliername"
            placeholder="eg. Compu Ghana"
            required
          />
        </div>

        <div class="field">
          <label for="supplieremail">*Supplier Email</label>
          <input
            type="text"
            name="supplieremail"
            placeholder="Enter Supplier Email"
            required
          />
        </div>

        <div class="field">
          <label for="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter Supplier location"
          />
        </div>

      
        <div class="field">
          <label for="phonenumber">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            placeholder="Enter Supplier phonenumber"
          />
        </div>

        <div class="button-module">
          <button id="addLaptop" onclick="addLaptop()">
            Add
          </button>
        </div>
      </div>

      {/* edit Supplier*/}
      <div
        className={`module ${showEditModule ? "active" : ""}`}
        id="editModule"
      >
        <i class="fas fa-x" onClick={() => handleEditClose()}></i>

        <div class="field">
          <h2>Edit {asset} Information</h2>
        </div>

        {/* <div class="status-field">
          <h4 id="SN-Display">{assetEditState.sn}</h4>
          <div class="status" id="laptop-status">
            {assetEditState.status === "Assigned" ? (
              <div className="status a">Assigned</div>
            ) : assetEditState.status === "Unused" ? (
              <div className="status u">Unused</div>
            ) : assetEditState.status === "Damaged" ? (
              <div className="status d">Damaged</div>
            ) : assetEditState.status === "Out of Service" ? (
              <div className="status oos">Out of Service</div>
            ) : (
              <div className="status r">Retired</div>
            )}
          </div>
        </div> */}

        {/* <div class="field">
          <label for="status">Status</label>
          <select
            name="status"
            id="edit-status-module"
            value={assetEditState.status}
          >
            <option value="" disabled selected hidden>
              Select a Status
            </option>
            <option value="Assigned" hidden disabled>
              Assigned
            </option>
            <option value="Unused">Unused</option>
            <option value="Retired">Retired</option>
            <option value="Damaged">Damaged</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div> */}

        <div class="field">
          <label for="supplier">*Supplier Name</label>
          <input
            type="text"
            name="suppliername"
            placeholder="eg. Compu Ghana"
            required
            value={assetEditState.supplier}
          />
        </div>

        <div class="field">
          <label for="supplieremail">*Supplier Email</label>
          <input
            type="text"
            name="supplieremail"
            placeholder="Enter Supplier Email"
            required
            value={assetEditState.email}
          />
        </div>

        <div class="field">
          <label for="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter Supplier 
            location"
            value={assetEditState.location}
          />
        </div>

        <div class="field">
          <label for="phonenumber">Phone Number</label>
          <input
            type="text"
            name="phonenumber"
            placeholder="Enter Supplier 
            phonenumber"
            value={assetEditState.phonenumber}
          />
        </div>


        <div class="button-module">
          <button id="saveLaptopBtn" onclick="saveLaptopInfo()">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
