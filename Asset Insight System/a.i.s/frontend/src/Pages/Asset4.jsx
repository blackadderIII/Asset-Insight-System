import React from 'react';
import '../css/Table.css'
import Table from '../Components/Table';
import {TitleComponent1} from '../Components/TitleComponent';

function Asset4() {
     
  return (
    <section class="main">
        <TitleComponent1 title={'Network Devices'}/>

        <div class="second-row">
            <div class="buttons">
                <div class="add-button" onclick="openModule()">
                    <i class="fal fa-add"></i>
                    <h5>Add</h5>
                </div>
                <div class="add-button" onclick="openModule()">
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

        <Table/>

    </section>
  )
}

export default Asset4
