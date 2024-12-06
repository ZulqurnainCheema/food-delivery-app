import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.css'
const AppDownload = () => {
  return (
    <div className='AppDownload' id='AppDownload'>
        <p>For Better Experience Download <br/> Cheezio's Cheezi App</p>
        <div className='AppDownloadPlatform'>
           <a target="__blank"href="https://play.google.com/store/apps/details?id=app.cheezio.com"><img src={assets.play_store} alt="" /></a> 
        </div>
      
    </div>
  )
}

export default AppDownload
