body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  .background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: background 0.5s ease-in-out;
    background: linear-gradient(to bottom, #ADD8E6, #fff);
  }
  
  .content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }
  
  .foreground-image {
    width: 100%;
    height: 100vh; 
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0; /* Set a lower z-index for the image */
    opacity: 0.95;
  }
  
  
  .card,  .error, .weather {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1; 
    color: white; 
  }
  
  .slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    text-align: center;
    z-index: 2; /* Set a higher z-index for the slider */
    background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent background for better readability */
    padding: 0px;
    border-radius: 10px;
  }
  
  
  
  .card {
    width: 100%;
    max-width: 470px;
    background: rgba(0, 0, 0, 0);
    color: #fff;
    margin: 0 auto 0;
    border-radius: 20px;
    padding: 40px 35px;
    text-align: center;
  }
  
  .button-container {
    display: grid;
    justify-content: center;
    margin-top: 20px; 
  }
  
  /* Adjust button styles as needed */
  button {
    padding: 10px;
    background-color: #ebfffc;
    border: 0;
    outline: 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  /* Add individual styling if required */
  button:nth-child(1) {
    /* Style for Confetti button */
  }
  
  button:nth-child(2) {
    /* Style for Voice button */
  }
  
  button:nth-child(3) {
    /* Style for Rave button */
  }
  .search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px; 
  }
  
  .search input {
    border: 0;
    outline: 0;
    background: #ebfffc;
    color: #555;
    padding: 10px 25px;
    height: 30px;
    border-radius: 30px;
    font-size: 18px;
    align-self: center;
  }
  
  .search button {
    border: 0;
    outline: 0;
    background: #ebfffc;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-left: 8px; 
    align-self: center;
  }
  
  .search button img {
    width: 16px;
  }
  
  .weather {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 20px; 
  }
  
  .weather-icon {
    width: 100px; 
    margin-right: 20px; 
    border-radius: 50%;
  }
  
  .weather-details {
    flex-grow: 1; /* Allow details to grow and take remaining space */
  }
  
  .weather button {
    background: #ebfffc;
    border: 0;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .weather h1 {
    font-size: 80px;
    font-weight: 500;
  }
  
  .weather h2 {
    font-size: 45px;
    font-weight: 400;
    margin-top: -2px;
  }
  
  .weather h3 {
    font-size: 30px;
    font-weight: 300;
    margin-top: -2px;
  }
  
  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 5px;
  }
  
  .col img {
    width: 40px;
    margin-right: 10px;
  }
  
  .weather {
    display: none;
  }
  
  .error {
   
    text-align: left;
    margin-left: 10px;
    font-size: 20px; 
    margin-top: 10px;
    display: none;
    color: red;
  }