
export const getLaptops = async () => {
    try {
      const response = await fetch(`http://localhost:3300/getlaptops`);
      const data = await response.json();
      return data
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }


   export async function deleteLaptop(sn) {
    try {
       const deleteLaptopAPI = await fetch (`http://localhost:3300/deleteLaptop/${sn}`)
    
       const response = await deleteLaptopAPI.json()
    
       if (
        response.message === "Error executing query" ||
        response.message === "Empty"
      ) {
        errorT("An error occured. Please try again later");
        return;
      }
    } catch (error) {
      console.log("There was an error deleting this laptop", error);
      errorT("Can't reach servers. Please try again later");
      return;
    }
    
    }


    // get users from DB
    export async function getUsers() {
  try {
    const fetchUsers = await fetch("http://localhost:3300/getUsers");
    const response = await fetchUsers.json();

    if (response.message === "Error executing query") {
      errorT("An error occured. Please try again later");
      return;
    }


    return response
    // response.forEach((user) => {
    //   const userOption = document.createElement("option");
    //   userOption.innerHTML = user.username;
    //   userOption.value = user.email;
    //   userOption.setAttribute("username", user.username);

    //   usersDropDown.appendChild(userOption);
    // });
  } catch (error) {
    console.log("error fetch users", error);
    errorT("Can't reach servers. Please try again later");
    return;
  }
}


// export laptops info
export async function exportLaptops() {
  try {
    const getExportLaptops = await fetch("http://localhost:3300/exportLaptops");
    const response = getExportLaptops;

    if (response === "error executing query") {
      errorT("An error occured. Please try again later");
      return;
    }

    if (response === "nothing to export") {
      warnT("Empty list, nothing to export");
      return;
    }

    location.href = "http://localhost:3300/exportLaptops";
    successT("Laptops exported successfully");
    return;
  } catch (error) {
    console.log("an error occured", error);
    errorT("Can't reach servers now. Please try again later");
    return;
  }
}

// save revoke Laptop
export async function revokeLaptop(sn) {
  try {
    const assign = await fetch(`http://localhost:3300/revoke/${sn}`);
    const response = await assign.json();

    if (response.message === "Error executing query") {
      errorT("An error occured. Please try again later");
      return;
    }

    successT("Laptop revoked successfully");
    closeAssignModule();
    return;
  } catch (error) {
    console.log("Error revoking laptop", error);
    errorT("Can't reach servers. Please try again later");
    return;
  }
}