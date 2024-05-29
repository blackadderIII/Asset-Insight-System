import React , { useState }  from 'react';
import '../css/Table.css'
import Table from '../Components/Table';
import {TitleComponent1} from '../Components/TitleComponent';
import Module from '../Components/module';

function Asset1() {

    const [moduleActive,setModuleActive] = useState([null,"add-active","edit-active"]);

    const openModule = (state) =>{
        setModuleActive(
          state  === moduleActive ? null : state
        ) 
    }
  return (
    <>
    <section class="main">
        
        <TitleComponent1 title={'Laptops'}/>

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

        <Table/>

    </section>

    <Module asset={'Laptop'} modulestate={moduleActive} />
    </>
  )
}

export default Asset1
