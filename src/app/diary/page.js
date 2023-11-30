"use client"

import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Diary() {
  const [getJudul, setGetJudul] = useState([]);
  const [getIsiDiary, setGetIsiDiary] = useState([]);
  const [getKoleksiData, setGetKoleksiData] = useState([]);
  const endpointAPI = "https://6555c39384b36e3a431e459e.mockapi.io/diaryku";
  async function getDiary() {
    try {
      const res = await axios.get(endpointAPI);

     
      const dataJSON = res.data;
      console.log("DATA DALAM", dataJSON);
      setGetKoleksiData(dataJSON);

    
      const judul = dataJSON.map((item) => item.judul);
      console.log("JUDUL DALAM", judul);
      setGetJudul(judul);

      
      const isi_diary = dataJSON.map((item) => item.isi_diary);
      console.log("ISI DALAM", isi_diary);
      setGetIsiDiary(isi_diary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  
  const [postTulisJudul, setPostTulisJudul] = useState("");
  const [postTulisDiary, setPostTulisDiary] = useState("");
  const [diary, setDiary] = useState([]);

  async function postDiary() {
  
    const updatedDiary = [
      ...getKoleksiData,
      { judul: postTulisJudul, 
        isi_diary: postTulisDiary },
    ];

    console.log("Mencetak diary yang baru ditambahkan:\n", updatedDiary);
    setDiary(updatedDiary);
    setPostTulisJudul("");
    setPostTulisDiary("");

    try {
      const res = await axios.post(endpointAPI, {
        judul: postTulisJudul,
        isi_diary: postTulisDiary,
      });

      if (res.status >= 200 && res.status < 300) {
        console.log("POST response:", res.data);
        
        getDiary();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert("failed to POST API" + error);
    }
  }
  function handlerInputJudul(event) {
    
    event.preventDefault();
    setPostTulisJudul(event.target.value);
  }
  function handlerInputIsiDiary(event) {
    
    event.preventDefault();
    setPostTulisDiary(event.target.value);
  }

  function handlerSubmitDiary(event) {
    setDiary(postTulisJudul);
    console.log("isi diary:" + diary);
  }
  function handlerKeyEnter(e) {
    e.preventDefault;
    if (e.key === "Enter") {
      setPostTulisJudul(e.target.value);
      setDiary(postTulisJudul);
    }
  }

  
  useEffect(() => {
    getDiary();
  }, []);

  return (
    
    <div>
      <div className="banner-container">
      <div className="cta-banner-wrapper">
          
          <input
            type="text"
            onChange={handlerInputJudul}
            onKeyDown={handlerKeyEnter}
            value={postTulisJudul}
            placeholder="Masukkan judul diary"
            className="cta-input"
          />

         <input
            type="text"
            onChange={handlerInputIsiDiary}
            onKeyDown={handlerKeyEnter}
            value={postTulisDiary}
            placeholder="Masukkan isi diary"
            className="cta-input"
          />

        <div
          className={`cta-button ${postTulisJudul && postTulisDiary ? '' : 'disabled'}`}
          style={{
            marginTop: '12px',
          }}
          onClick={postTulisJudul && postTulisDiary ? postDiary : () => alert('Isi terlebih dahulu!')}
        >
          <p>{postTulisJudul && postTulisDiary ? 'Submit Diary' : 'Disabled'}</p>
        </div>

           
        </div>
        </div>

        {getKoleksiData ? (
        getJudul.length > 0 ? (
          <ul>
            {getJudul.map((item, idx) => (
              <Link href={`/diary/${item}/${getIsiDiary[idx]}`}>
                <li key={idx}>
                  <div
                    className={`diary-container ${
                      idx === getJudul.length - 1 ? "last-item" : ""
                    }`}
                  >
                    <h1>{getJudul[idx]}</h1>
                    <p className="p-diary">{getIsiDiary[idx]}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          "API is loading"
        )
      ) : (
        "API-nya empty"
      )}
    </div>
  );
}