import React from 'react';
import '../css/Table.css'

export default function Table() {
  return (
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
  )
}


