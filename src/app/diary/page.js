"use client";
import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Diary() {
  const [judul, setJudul] = useState([]);
  const [isiDiary, setIsiDiary] = useState([]);

  const endpointAPI = "https://6555c39384b36e3a431e459e.mockapi.io/diaryku";

  async function getDiary() {
    const res = await axios.get(endpointAPI);
    const data = res.data;

    //ambil judul
    const judul = data.map((item) => item.judul);
    setJudul(judul);

    //ambil isi_diary
    const isi_diary = data.map((item) => item.isi_diary);
    setIsiDiary(isi_diary);
  }

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      {judul.length > 0 ? (
        <ul>
          {judul.map((item, idx) => (
              <li>
                <div className="diary-container">
                    <h1>{judul[idx]}</h1>
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
