"use client"

import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Diary() {
  const [judul, setJudul] = useState([]);
  const [isiDiary, setIsiDiary] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const [tulis, setTulis] = useState('');
  const [diary, setDiary] = useState([]);

  function handlerGantiNama() {
    setDiary(tulis);
    
  }



  useEffect(() => {
    console.log('isi Diary: ' + diary);
  }, [diary]);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handlerGantiNama();
    }
  }

 

  async function postDiary(){
    const updateDiary = [...isLoading, tulis]
    setIsLoading(updateDiary)
    setTulis('')
  }

  

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
      <div className="banner-container">
      <div className="cta-banner-wrapper">
          
          <input
            type="text"
            value={tulis}
            onChange={(e) => setTulis(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Masukkan nama"
            className="cta-input"
          />
           <div
            className={`cta-button ${tulis ? '' : 'disabled'}`}
            style={{
              marginTop: '12px',
            }}
            onClick={tulis ? handlerGantiNama : () => alert('Isi terlebih dahulu!')}
          >
            <p>{tulis ? 'Ganti Nama' : 'Disabled'}</p>
          </div>
        </div>
        </div>

      <div>
      {isLoading ? ( 
        <div className="loading-message">API is loading</div>
      ) : judul.length > 0 ? (
        <ul>
          {judul.map((item, idx) => (
            <Link href={`/diary/${item}/${isiDiary[idx]}`}>
            <li key={idx}> 
              <div className={`diary-container ${idx === judul.length -1? 'last-item' : ''}`}>
                <h2>{judul[idx]}</h2>
                <p className="p-diary">{isiDiary[idx]}</p>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="loading-message">API not loading</div>
      )}
      </div>
    </div>
  );
}