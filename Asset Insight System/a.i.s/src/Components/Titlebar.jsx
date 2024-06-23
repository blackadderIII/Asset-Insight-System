import React from 'react';
import '../css/titleBar.css'

function Titlebar() {
  return (
    <div class="titleBar">
        <div class="logo">
            <img src="./assets/logo/fav-icon.png"/>
        </div>
        <div class="controlButtons">
            <i class="fal fa-minus" id="minimizeBtnMain"></i>
            <i class="fal fa-window-restore" id="maxResBtnMain"></i>
            <i class="fal fa-x" id="closeBtnMain"></i>
        </div>
    </div>
  )
}

export default Titlebar
