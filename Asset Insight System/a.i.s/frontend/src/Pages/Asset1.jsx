import React from 'react';
import '../css/Table.css'

function Asset1() {
  return (
    <section class="main">
        <div class="first-row">
            <div class="greeting">
                <h1>Laptops</h1>
                <p>An overview of the laptops in the origanization</p>
            </div>
            <div class="date">
                <span id="todaysDate">Today, November 22, 2023</span>
            </div>
        </div>

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

        <div class="third-row">
            <table id="laptops">
                <thead>
                    <th>SN</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th></th>
                    <th>User</th>
                    <th>Date Added</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </thead>

                <tbody id="main-table">

                    <div class="loading" id="loading"></div>

                </tbody>

                <tbody class="inactive" id="search-table">
                </tbody>
            </table>
        </div>

    </section>
  )
}

export default Asset1
