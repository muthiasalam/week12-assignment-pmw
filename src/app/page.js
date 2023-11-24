'use client'
import { useState } from 'react';
import Image from 'next/image';
import '@styles/home.css';

export default function Home() {
  const [inputNama, setInputNama] = useState('');
  const [nama, setNama] = useState('Muthia A. Salam');

  function handlerGantiNama() {
    setNama(inputNama);
    setInputNama('');
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handlerGantiNama();
    }
  }

  const isInputEmpty = inputNama.trim() === ''; 

  return (
    <>
      <div className="banner-container">
     
        <div className="header-banner-wrapper">
          
          <div className="profile-header-banner">
        
            <Image src="/assets/profile.png" alt="Picture of the author" fill objectFit="contain" />
          </div>
          <div className="content-header-banner">
         
            <h1>{nama}</h1>
            <div className="bio-nim-header-banner">
              
              <p>D121211003</p>
              <p>Pemrograman Web A Inforgit </p>
            </div>
          </div>
        </div>
        <div className="cta-banner-wrapper">
          
          <input
            type="text"
            value={inputNama}
            onChange={(e) => setInputNama(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Masukkan nama"
            className="cta-input"
          />
          <div
            className={`cta-button ${isInputEmpty ? 'disabled' : ''}`}
            style={{
              marginTop: '12px',
            }}
            onClick={isInputEmpty ? () => alert('Isi terlebih dahulu!') : handlerGantiNama}
            disabled={isInputEmpty}
          >
            <p>{isInputEmpty ? 'Disabled' : 'Ganti Nama'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
