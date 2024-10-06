import React from 'react'

export default function Author(id) {
  return (
    <fieldset id="">
    <br />
    <legend>Author</legend>
    <label for="fname-author1">First Name:</label>
    <input type="name" id="fname" name="fname-author1" onchange="change()" />
    <label for="lname-author1">Last Name:</label>
    <input type="name" id="lname" name="lname-author1" onchange="change()" />
    <label for="email-author1">Email:</label>
    <input type="email" id="email" name="email-author1" onchange="change()" />
    <label for="affiliation">Affiliation:</label>
    <input type="select" id="affiliation" name="affiliation"> </input>
    <select name="affiliation-author1" class="affiliation1"></select>
    <br/>
    <br/>
    <label for="author1" style="margin-left:46%">Presenter</label>

    <input type="radio" id="author1" name="presenter" value="author1" checked="checked" />
  </fieldset>
  )
}
