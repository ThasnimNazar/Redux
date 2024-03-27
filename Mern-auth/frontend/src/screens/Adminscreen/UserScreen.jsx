import { useState,useEffect } from "react";
import { useGetUsersDataMutation } from '../../slices/Adminapislice'
import AdminaddUser from "../../components/adminComponents/AdminaddUser";
import { toast } from "react-toastify";
import Userdata from "../../components/adminComponents/Userdata";
import Loader from "../../components/Loader";

const UserScreen = () => {

    const [usersData, setUsersData] = useState([]);

    const [usersDataFromAPI, { isLoading } ] = useGetUsersDataMutation();

    useEffect(() => {
    
        try {
    
          const fetchData = async () => {
    
            const responseFromApiCall = await usersDataFromAPI();
    
            const usersArray = responseFromApiCall.data.usersData;
            
            setUsersData(usersArray);
    
          };
      
          fetchData();
    
        } catch (error) {
    
          toast.error(error);
    
          console.error("Error fetching users:", error);
    
        }
    
      }, []);
    

    return (
      <div>
        <h1>Users List</h1>
        <AdminaddUser/>
        { isLoading ? <Loader/> : <Userdata users={usersData} /> }

      </div>
    );
  };
  
  export default UserScreen;
  