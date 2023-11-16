'use client'

import { useState } from 'react'
import Image from 'next/image'
import '@styles/home.css'

export default function Home() {

  const [nama, setNama] = useState('Muthia A. Salam')
  const [inputNama, setInputNama] = useState('') // Tambahkan state untuk menyimpan input sementara


  function handlerGantiNama() {
    setNama(inputNama) // Mengganti nama dengan nilai dari inputNama
    setInputNama('') // Reset inputNama setelah mengganti nama
  }

  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handlerGantiNama();
    }
  }
  
  return (
    <>
      <div className="banner-container">
        {/* Kartunya */}
        <div className="header-banner-wrapper">
          {/* Foto Profil dan Nama */}
          <div className="profile-header-banner">
            {/* Foto Profil*/}
            <Image
              src="/assets/profile.png"
              alt="Picture of the author"
              fill
              objectFit='contain'
            />
          </div>
          <div className="content-header-banner">
            {/* Nama dan Lain2*/}
            <h1>{nama}</h1>
            <div className="bio-nim-header-banner">
            {/* NIM dan BIO*/}
            <p>D121211003</p>
            <p>Pemrograman Web A</p>
            </div>
          </div>
        </div>
        <div className="cta-banner-wrapper">
          {/* Tombol CTA */}
            <input
              type="text"
              value={inputNama}
              onChange={(e) => setInputNama(e.target.value)}
              onKeyDown={handleKeyPress} 
              placeholder="Masukkan nama"
              className="cta-input" 
            />
            <div className='cta-button' 
            style={{
              marginTop: '12px'
            }}
            onClick={handlerGantiNama}>
              <p>Ganti Nama</p>
            </div>
        </div>
      </div>
    </>
  )
}