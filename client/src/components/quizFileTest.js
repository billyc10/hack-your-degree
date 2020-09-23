<! DOCTYPE html>
<html>
<read>

<title>Kahoot Quiz<\title>
<link href ="style.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<script src = "main.js></script>

</head>

<body>

<h1> Student quiz </h1>
<form id = "quiz" name = "quiz">

<p>Kahoot</p>
<iframe src="https://kahoot.it/" style="border:0px #ffffff none;" name="Kahoot" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="400px" width="600px" allowfullscreen></iframe>


//<p>Sample question 1</p>
//<input id = "textbox" type = "text" name = "q1">

<p>Sample question 2</p>
<input type = "radio" id = "mc" name = "question 2" value = "Option 1"> Option 1<br>
<input type = "radio" id = "mc" name = "question 2" value = "Option 2"> Option 2<br>
<input type = "radio" id = "mc" name = "question 2" value = "Option 3"> Option 3<br>
<input type = "radio" id = "mc" name = "question 2" value = "Option 4"> Option 4<br>

<input id = "button" type = "button" value = "I'm done" onclick = "check();">

</form>
</body>

</html>