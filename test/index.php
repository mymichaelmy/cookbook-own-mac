<!DOCTYPE html>
<html>
<head>
<title>Create a Zip File Using PHP and Download Multiple Files</title>
</head>
<body>
<h1>Create a Zip File Using PHP and Download Multiple Files</h1>
<form name="zips" action="action.php" method="post">
<input type="checkbox" name="files[]" value="SampleFile.pdf"/><label>PDF File</label><br />
<input type="checkbox" name="files[]" value="SampleFile.docx"/><label>Word File</label><br />
<input type="checkbox" name="files[]" value="HTML5.png"/><label>Image File</label><br />
<input type="submit" id="submit" name="createzip" value="Download All Seleted Files" >
</form>
</body>
</html>