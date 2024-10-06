
export default function SubmitPaper() {
  return (
    <>
    
  {/* <main onload="populate()"> */}
    <div class="nav">

      <ul class="main-nav">
        <img src="./img/confplus.png" alt="" style="max-width:6rem;max-height:6rem"></img>

        <li><a href="index.html">Home</a></li>
        <li><a href="submit-paper.html">Submit Paper</a></li>
        <li><a href="review-paper.html">Review Paper</a></li>
        <li><a href="#">Schedule</a></li>
        <li><a href="login.html" onclick="logout()">Logout</a></li>

      </ul>
    </div>
    <div style="text-align: center; margin-top: 40px" class="info">

      <div class="progress-bar">
        <span class="step">1. Paper Details </span>
        <span class="step">2. Authors </span>
        <span class="step">3. Upload Paper </span>
      </div>
    </div>
    <div class="container">
      <form id="submit-paper" action="">
        <h1>Submit Paper:</h1>
        <div class="tab">
          <h3>Paper Details:</h3>
          <label for="title" class="placeholder">Paper Title:</label>
          <input type="text" name="title" placeholder="The most amazing paper in the world!!!!" onchange="change()"></input>
          <label for="abstract">Abstract:</label>
          <textarea id="abstract" name="abstract" placeholder="Short summary of the paper" required
            onchange="change()"></textarea>
        </div>
        <div class="tab" id="authors">

          <p>Authors:</p>
          <button type="button" id="add" onclick="addAuthor()" class="auth-btn">
            +
          </button>
          <button type="button" id="delete" onclick="deleteAuthor()" class="auth-btn">
            -
          </button>
         
        </div>


        <div class="tab">
          <label for="file">Paper:</label>
          <input type="file" id="file" name="file" />
        </div>
        <div style="overflow: auto">
          <div style="float: right">
            <button type="button" id="prev" class="prev" onclick="buttons(-1)">
              Previous
            </button>
            <button type="button" id="next" class="next" onclick="buttons(1)">
              Next
            </button>

          </div>


          <div class="spin hidden">

          </div>
          <div class="check hidden"></div>
        </div>
      </form>
    </div>
    </>
  )
}
