
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




