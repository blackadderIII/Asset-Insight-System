import React from "react";
import "../css/module.css";

export default function Module({ asset, modulestate }) {
  return (
    <div>
      {/* Add Laptop */}
      <div
        className={`module ${modulestate === "add-active" ? "active" : ""}`}
        id="module"
      >
        <i class="fas fa-x" onclick="closeModule()"></i>

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
            placeholder="Enter the laptop's model"
            required
          />
        </div>

        <div class="field">
          <label for="processor">Processor</label>
          <input
            type="text"
            name="processor"
            id="processor-module"
            placeholder="Enter the laptop's processor spec"
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="ram-module"
            placeholder="Enter the laptop's RAM spec"
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="hardDrive-module"
            placeholder="Enter the laptop's Storage Capacity"
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
        <i class="fas fa-x" onclick="closeModule()"></i>

        <div class="field">
          <h2>Edit {asset} category</h2>
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
            placeholder="Enter the laptop's model"
            required
          />
        </div>

        <div class="field">
          <label for="processor">Processor</label>
          <input
            type="text"
            name="processor"
            id="processor-module"
            placeholder="Enter the laptop's processor spec"
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="ram-module"
            placeholder="Enter the laptop's RAM spec"
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="hardDrive-module"
            placeholder="Enter the laptop's Storage Capacity"
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
      <div class="module" id="editModule">
        <i class="fas fa-x" onclick="closeEditModule()"></i>

        <div class="field">
          <h2>Edit {asset}</h2>
        </div>

        <div class="status-field">
          <h4 id="SN-Display"></h4>
          <div class="status" id="laptop-status"></div>
        </div>

        <div class="field">
          <label for="status">Status</label>
          <select name="status" id="edit-status-module">
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
          />
        </div>

        <div class="field">
          <label for="processor">Processor</label>
          <input
            type="text"
            name="processor"
            id="edit-processor-module"
            placeholder="Enter the laptop's processor spec"
          />
        </div>

        <div class="field">
          <label for="ram">RAM Size</label>
          <input
            type="text"
            name="ram"
            id="edit-ram-module"
            placeholder="Enter the laptop's RAM spec"
          />
        </div>

        <div class="field">
          <label for="hardDrive">Hard Drive Capacity</label>
          <input
            type="text"
            name="hardDrive"
            id="edit-rom-module"
            placeholder="Enter the laptop's RAM spec"
          />
        </div>

        <div class="field">
          <label for="comment">Comment</label>
          <textarea name="comment" id="edit-comment-module" rows="5"></textarea>
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
