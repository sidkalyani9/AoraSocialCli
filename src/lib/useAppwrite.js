import { Alert } from "react-native";
import { useEffect, useState } from "react";

export default function useAppwrite(fn,searchParams) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      if(searchParams){
        res = await fn(searchParams);  
      }
      else{
        res = await fn();
      }
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

