import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // return (
  //   <main className={styles.main}>
  //     <div className={styles.description}>
  //       <p>
  //         Get started by editing&nbsp;
  //         <code className={styles.code}>app/page.js</code>
  //       </p>
  //       <div>
  //         <a
  //           href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           By{' '}
  //           <Image
  //             src="/vercel.svg"
  //             alt="Vercel Logo"
  //             className={styles.vercelLogo}
  //             width={100}
  //             height={24}
  //             priority
  //           />
  //         </a>
  //       </div>
  //     </div>

  //     <div className={styles.center}>
  //       <Image
  //         className={styles.logo}
  //         src="/next.svg"
  //         alt="Next.js Logo"
  //         width={180}
  //         height={37}
  //         priority
  //       />
  //     </div>

  //     <div className={styles.grid}>
  //       <a
  //         href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className={styles.card}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={inter.className}>
  //           Docs <span>-&gt;</span>
  //         </h2>
  //         <p className={inter.className}>
  //           Find in-depth information about Next.js features and API.
  //         </p>
  //       </a>

  //       <a
  //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className={styles.card}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={inter.className}>
  //           Learn <span>-&gt;</span>
  //         </h2>
  //         <p className={inter.className}>
  //           Learn about Next.js in an interactive course with&nbsp;quizzes!
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className={styles.card}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={inter.className}>
  //           Templates <span>-&gt;</span>
  //         </h2>
  //         <p className={inter.className}>Explore the Next.js 13 playground.</p>
  //       </a>

  //       <a
  //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  //         className={styles.card}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={inter.className}>
  //           Deploy <span>-&gt;</span>
  //         </h2>
  //         <p className={inter.className}>
  //           Instantly deploy your Next.js site to a shareable URL with Vercel.
  //         </p>
  //       </a>
  //     </div>
  //   </main>
  // )
  return (
<div>
  <main>
    <nav>
      <div className="nav">
        <img src="./img/confplus.png" alt style={{maxWidth: '6rem', maxHeight: '6rem'}} />
        <ul className="main-nav">
          <li><Link href="index.html">Home</Link></li>
          <li><Link href="submit-paper.html">Submit Paper</Link></li>
          <li><Link href="review-paper.html">Review Paper</Link></li>
          <li><Link href="schedule.html">Schedule</Link></li>
          {/* <li><Link href="login.html" className="log" onclick="logout()">{localStorage.user ? "Logout" : "Login"}</Link></li> */}
        </ul>
      </div>
    </nav>
    <div className="banner">
      <h1>Welcome to ConfPlus!<br /> The future of Web Conferencing</h1>
    </div>
    <div className="words">
      <div className="content">
        <h2>Our Aim</h2>
        <p>Our aim of this web conference app is to help aid the communication between individuals, assist in
          the means of collaboration, and connect users together in one platform to give papers that highly
          contribute to our society the spotlight. While also allowing different authors to submit their ideas
          for helping man-kind. And we give the opportunity to highly trusted individuals to rate the
          different papers based on the contribution and quality of the content. By doing all of the above, we
          create a lovely environment with ease of use.</p>
        <h2>Our Vision</h2>
        <p>Our vision of our web conference app is to lead the web conferencing market around the world to help
          create a friendly and easy environment, while giving all papers a fair chance to shed the light on
          the different topics and cases that affect us on a daily basis. This allows for a competitive
          platform that helps keep papers of high quality and help them to further contribute to society. We
          also want to enhance the user experience and act as a helping hand to individuals that are seeking
          help with research</p>
        <h2>Our Accomplishments</h2>
        <p>Our community have accomplished many things while using our platform.</p>
        <ul className="list">
          <li>Launched a fundraiser that raised QAR 100,000,000 to charity.</li>
          <br />
          <li>Helped reduce carbon emissions.</li>
          <br />
          <li>Brought many different communities together.</li>
          <br />
          <li>Gave every author fairness in reviewing their papers</li>
        </ul>
      </div>
      <aside>
        <div className="contents" style={{height: '10vh'}}>
          <h2>Developed Using The Following:</h2>
        </div>
        <div className="contents">
          <div>
            <img src="img/html.png" alt style={{width: '20vh'}} />
            <img src="img/css.png" alt style={{width: '15vh'}} />
            <img src="img/js.png" alt style={{width: '20vh'}} />
            <img src="img/next.png" alt style={{width: '20vh'}} />
          </div>
        </div>
      </aside>
    </div>
  </main>
  <footer>
    <div className="footer-content">
      <p> <b>Copyright @ 2023 | Developed by Salem Al-Ansari and Moadh Ben Abderrahim</b></p>
    </div>
  </footer>
</div>

  );
}
