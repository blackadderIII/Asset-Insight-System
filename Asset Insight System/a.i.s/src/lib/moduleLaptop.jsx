
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




