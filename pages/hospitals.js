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
    return (
      <>
        <Head>
          <title>Departments</title>
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
    <h1>Search by Hospital</h1>
    <div id="papers" className="paper-container">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="card" onClick={() => (location.href = `/hospitals/${hospital.id}`)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
              <h1>{hospital.name}</h1>
            </div>
          ))}
    </div>
      </>
    );
  }