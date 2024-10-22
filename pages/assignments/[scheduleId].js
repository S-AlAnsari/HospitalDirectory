import Head from 'next/head';
let id;
export async function getServerSideProps({ params }) {
  const { scheduleId } = params; // Get the scheduleId from the URL parameters

  // Create a date object in UTC and adjust to Qatar time (UTC+3)
  const qatarDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Qatar" }));
  qatarDate.setDate(qatarDate.getDate() + 1);
  // Format the date to 'YYYY-MM-DD'
  const formattedDate = qatarDate.toISOString().split('T')[0];

  // Fetch schedules based on yesterday's date
  const response = await fetch(`http://localhost:3000/api/schedules?date=${formattedDate}`);
  const schedules = await response.json();

  // Handle case when schedules are not found
  if (!schedules || schedules.length === 0) {
      return {
          notFound: true,
      };
  }

  return {
      props: {
          schedules,
          scheduleId,
      },
  };  
}
  const getCriteriaName = (criteria) => {
    switch (criteria) {
      case 1:
        return '1st On Call'; // Change this to your desired name
      case 2:
        return '2nd On Call'; // Change this to your desired name
      case 3:
        return 'Consultant'; // Change this to your desired name
      default:
        return 'Unknown Criteria';
    }
  };
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
  export default function Department({ schedules, scheduleId}) {
    const assignments = schedules[0].assignments.filter((assignment) => assignment.departmentId == scheduleId)
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
        <div class="nav">
          <ul class="main-nav">
          <li><a href="/hospitals">Hospital Directory</a></li>
          <li><a href="/scheduler">Scheduler</a></li>
          <li><a href="/profile">Edit Profile</a></li>
            <li><a href="login.html" class="log" onClick={() => logout()}>Logout</a></li>
          </ul>
        </div>
      </nav>
      <div id="submit-paper" className="paper-container" style={{padding:"0rem", width:"13rem"}}>
      <h1 style={{ textShadow: '1px 0.5px 5px rgba(0,0,0,0.7)', color:"white", margin:"1rem"}}>Assignments</h1>
    </div>
    <div id="submit-paper" className="paper-container">
    <div className="card" onClick={() => (location.href = `/hospitals/`)} style={{backgroundImage: circularGradients[2], cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center', maxWidth: "2.5rem", minWidth: "2.5rem", maxHeight:"2.5rem", minHeight:"2.5rem"}}>
    <i className="fa fa-arrow-left fa-2x" aria-hidden="true" style={{color:"white"}}></i>
            </div>
    <div id="papers" className="paper-container">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="card" onClick={() => (location.href = `tel:+974${assignment.user.phone}`)} style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative', // Enable positioning for pseudo-element
                overflow: 'hidden', // Prevent overflow for pseudo-element
                backgroundImage: circularGradients[((department.id+9) % circularGradients.length)], // Apply circular gradient
                color: 'white', // Text color for visibility
              
             }}>
              <h1 style={{fontSize: "1.8rem"}}>{getCriteriaName(assignment.criteria)}</h1>
              <h2>Dr. {assignment.user.first_name} {assignment.user.last_name}</h2>
              <p>+974 {assignment.user.phone}</p>
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