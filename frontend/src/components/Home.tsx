import { useEffect, useState } from "react";

const Home = () => {
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://127.0.0.1:8000/summary", {
        method: "GET",
      });
      const jsonData = await data.json();
      setName(jsonData["Customer Name"]);
    };
    api();
  }, []);
  return (
    <div className="text-white">
      <h2>Hello {name}</h2>
    </div>
  );
};

export default Home;
