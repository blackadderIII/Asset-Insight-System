import React ,{useEffect,useState} from "react";
import "../css/module.css";


export function ModuleLaptop({ asset, modulestate, onClose, assetEditState,showEditModule,closeEditModule }) {
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };
  //------------------------------------------------------ 
    const [sn,setSn] = useState(null)
    const [brand,setBrand] = useState(null)
    const [model,setModel] = useState(null)
    const [processor,setProcessor] = useState(null)
    const [ram,setRam] = useState(null)
  // -----------------------------------------------------
  useEffect(() =>{
    async function addLaptop(){
      const addLaptopAPI = await fetch('http://localhost:3300/addLaptop',
        {
          method : 'POST',
          headers : {
            'Content-type':'application/json'
          },
          body: JSON.stringify({
  
  
          })
  
        })
    }
  
  },[]
  )

  


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
          <input type="text" name="SN" id="SN-module" readonly required onChange={(e)=>{setSn(e)}} />
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
            onChange={(e)=> setProcessor(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="ram-module"
            placeholder={`Enter the ${asset}'s RAM spec`}
            onChange={(e)=>setRam(e.target.value)}
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
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

      {/* edit laptops*/}
      
       <div className={`module ${showEditModule ? "active" : ""}`} id="editModule">
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
      <select name="status" id="edit-status-module" value={assetEditState.status}>
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
      <label for="processor">Processor</label>
      <input
        type="text"
        name="processor"
        id="edit-processor-module"
        placeholder="Enter the laptop's processor spec"
        value={assetEditState.processor}
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
        value={(assetEditState.suppliername === null ? (''):
        (assetEditState.suppliername))}
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

export function ModulePhone({ asset, modulestate, onClose, assetEditState,showEditModule,closeEditModule }) 
{
  const handleClose = () => {
    onClose();
  };
  const handleEditClose = () => {
    closeEditModule();
  };
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
      <div className={`module ${showEditModule ? "active" : ""}`} id="editModule">
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
      <select name="status" id="edit-status-module" value={assetEditState.status}>
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

export function ModuleMNP({ asset, modulestate, onClose, assetEditState,showEditModule,closeEditModule }) {
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
      <div className={`module ${showEditModule ? "active" : ""}`} id="editModule">
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
      <select name="status" id="edit-status-module" value={assetEditState.status}>
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

export function ModuleUsers({ asset, modulestate, onClose, assetEditState,showEditModule,closeEditModule }) {
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
      <div className={`module ${showEditModule ? "active" : ""}`} id="editModule">
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
      <select name="status" id="edit-status-module" value={assetEditState.status}>
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
