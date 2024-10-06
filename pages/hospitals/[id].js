import Head from 'next/head';
export async function getServerSideProps({ params }) {
    const { id } = params; // Get the hospital ID from the URL parameters
    const response = await fetch(`http://localhost:3000/api/departments?hospitalId=${id}`); // Fetch hospital details from your API
    const departments = await response.json();
  
    // Handle case when hospital is not found
    if (!departments) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        departments,
      },
    };
  }
  export default function Department({ departments }) {
    return (
        <>
        <Head>
          <title>Departments</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* <script src="/js/numbers.js" defer></script> */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
          <link rel="stylesheet" href="/styles/numbers.css" />

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
    <div className="card" onClick={() => (location.href = `/hospitals/`)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', maxWidth: "2.5rem", minWidth: "2.5rem", maxHeight:"2.5rem", minHeight:"2.5rem"}}>
    <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
            </div>
    <div id="papers" className="paper-container">
          {departments.map((department) => (
            <div key={department.id} className="card" onClick={() => (location.href = `/assignments/${department.id}`)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
              <h1>{department.name}</h1>
            </div>
          ))}
    </div>
      </>
    );
  }