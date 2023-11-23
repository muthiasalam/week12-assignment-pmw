import '@styles/diarypost.css'
export default function DiaryPost({params}) {
    const {judul, isi_diary} = params

    return(
        <div className = "diary-post-container">
            <h2>{decodeURIComponent(judul)}</h2>
            <p>{decodeURIComponent(isi_diary)}</p>
        </div>
    )
}