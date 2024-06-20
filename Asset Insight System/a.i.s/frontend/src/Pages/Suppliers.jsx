import React, { useEffect, useState } from 'react';
import { TitleComponent1 } from '../Components/TitleComponent';
import { SupplierTable } from '../Components/Table';
import { json } from 'express';

export default function Suppliers() {
    const [suppliers,setSuppliers] = useState([]);

    useEffect(()=>{
        const getSupplierData  =  await fetch 'http://localhost:3300/getSuppliers';
        const response = await getSupplierData.json()

    }


,[])

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

    <SupplierTable/>

</section>
  )
}
