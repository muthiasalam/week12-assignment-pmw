"use client";

import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Diary() {
  const [judul, setJudul] = useState([]);
  const [isiDiary, setIsiDiary] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const endpointAPI = "https://6555c39384b36e3a431e459e.mockapi.io/diaryku";

  async function getDiary() {
    try {
      const res = await axios.get(endpointAPI);
      const data = res.data;

      
      const judul = data.map((item) => item.judul);
      setJudul(judul);

      
      const isi_diary = data.map((item) => item.isi_diary);
      setIsiDiary(isi_diary);

      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      {isLoading ? ( 
        "API is loading"
      ) : judul.length > 0 ? (
        <ul>
          {judul.map((item, idx) => (
            <li key={idx}> 
              <div className={`diary-container ${idx === judul.length -1? 'last-item' : ''}`}>
                <h2>{judul[idx]}</h2>
                <p className="p-diary">{isiDiary[idx]}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        "API not loading"
      )}
    </div>
  );
}