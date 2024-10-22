import Head from 'next/head';
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/hospitals'); // Use your actual API endpoint
  const hospitals = await response.json();

  return {
    props: {
      hospitals,
    },
  };
}

export default function Numbers({ hospitals }) {
  const getGradientFromId = (id) => {
    // Convert ID to a number and get a gradient index
    const index = Number(id) % circularGradients.length;
    return circularGradients[index]; // Return the gradient from the array
  };
  
  // Define an array of gradients
  const circularGradients = [
    'radial-gradient(circle, #6a82fb 0%, #fc5c7d 100%)', // Blue to Pink
    'radial-gradient(circle, #00c6ff 0%, #0072ff 100%)', // Bright Blue
    'radial-gradient(circle, #f75c5e 0%, #e81013 100%)', // Bright Red to Orange
    'radial-gradient(circle, #00d2ff 0%, #3a7bd5 100%)', // Light Blue to Dark Blue
    'radial-gradient(circle, #f9d423 0%, #ff4e50 100%)', // Yellow to Red
    'radial-gradient(circle, #3bcb9c 0%, #0abfbc 100%)', // Bright Green to Teal
    'radial-gradient(circle, #8e2de2 0%, #4a00e0 100%)', // Purple to Dark Purple
    'radial-gradient(circle, #ffafbd 0%, #ffc3a0 100%)', // Soft Pink to Peach
    'radial-gradient(circle, #ff758c 0%, #ff7eb3 100%)', // Pink to Light Pink
  ];
  const colors = [
    '#FF5733', // Red
    '#13ab15', // Green
    '#3357FF', // Blue
    '#F1C40F', // Yellow
    '#8E44AD', // Purple
    '#E67E22', // Orange
    '#2ECC71', // Emerald
    '#3498DB', // Peter River
    '#E74C3C', // Alizarin
    '#95A5A6', // Concrete
  ];
  
  const getColorFromId = (id) => {
    // Convert ID to a number and get a color index
    const index = Number(id) % colors.length;
    return colors[index]; // Return the color from the array
  };  
  async function logout() {
    localStorage.clear();
  }
    return (
      <>
        <Head>
          <title>Hospitals</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* <script src="/js/numbers.js" defer></script> */}
          <link rel="stylesheet" href="./styles/numbers.css" />

        </Head>
        <nav>
        <div class="nav">
          <ul class="main-nav">
          <li><a href="/hospitals">Hospital Directory</a></li>
          <li><a href="/scheduler">Scheduler</a></li>
          <li><a href="/profile">Edit Profile</a></li>
            <li><a href="login.html" class="log" onClick={() => logout()}>Logout</a></li>
          </ul>
        </div>
      </nav>
      <div id="submit-paper" className="paper-container" style={{padding:"0rem", width:"20rem"}}>
      <h1 style={{ textShadow: '1px 0.5px 5px rgba(0,0,0,0.7)', color:"white", margin:"1rem"}}>Search by Hospital</h1>
    </div>
    <div id="submit-paper" className="paper-container">
    
<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
    {hospitals.map((hospital) => (
  <div
  key={hospital.id}
  className="card"
  onClick={() => (location.href = `/hospitals/${hospital.id}`)}
  style={{
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative', // Enable positioning for pseudo-element
    overflow: 'hidden', // Prevent overflow for pseudo-element
    backgroundImage: circularGradients[hospital.id % circularGradients.length], // Apply circular gradient
    color: 'white', // Text color for visibility
  }}
>
  <h1 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>{hospital.name}</h1>
</div>

))}
</div>
    </div>
    <footer style={{ }}>
    <div id="submit-paper" className="paper-container" style={{minHeight:"0.5rem",maxHeight:"0.5rem",paddingTop:"0rem", bottom:"0px", position:"fixed"}}>
      <p>Copyright @ 2024 | Salem Al-Ansari</p>
</div>
    </footer>
      </>
    );
  }