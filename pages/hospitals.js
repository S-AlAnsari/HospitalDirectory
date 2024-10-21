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
    return (
      <>
        <Head>
          <title>Hospitals</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* <script src="/js/numbers.js" defer></script> */}
          <link rel="stylesheet" href="./styles/numbers.css" />

        </Head>
    <nav>
      <div className="nav">
        <ul className="main-nav">
          <li><a href="index.html">Home</a></li>
          <div className="dropdown">
              <button className="dropbtn">Papers
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <a href="/submit-paper.html">Submit Papers</a>
                <a href="/my-papers.html">My Paper</a>
                <a href="/review-paper.html">Review Papers</a>
                <a href="/reviewed-papers.html">My Reviews</a>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Schedule
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <a href="/conference.html">Add/Edit Schedule</a>
                <a href="/schedule.html">Check Schedule</a>
              </div>
            </div>
            <li><a href="/statistics.html">Statistics</a></li>
          <li><a href="login.html" className="log" onClick={() => logout()}></a></li>
        </ul>
      </div>
    </nav>
    <h1 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)', color:"white" }}>Search by Hospital</h1>
    <div id="papers" className="paper-container">
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
      </>
    );
  }