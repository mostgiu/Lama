"use client";
import styles from "./page.module.css";
import { useEffect , useState} from "react";
import useSWR from "swr";
import { signIn, useSession } from "next-auth/react";

const Dashboard = () => {
const [data,setData]=useState([]);
const[error,setError]=useState(false);
const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      // const fetchData = async () => {
      //   setIsLoading(true);
      //   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      //     cache: "no-store",
      //   });
      //   if (!res.ok) {
      //     setError(true);
      //   } 
      //   {
      //     setData( res.json());
      //     setIsLoading(false);
      //   } 
      // }
      // fetchData();
    
  }, []);


  const session = useSession();
  console.log (session)
 
  const ftcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: swrData, error: swrError } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    ftcher
  );


  return (
    <div className={styles.container}>
     <p>Dashboard</p>
     <button onClick={()=> signIn("google")}>login with google </button>
    
    </div>
  );
};

export default Dashboard;