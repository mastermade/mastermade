function reExpress() {
	selected = expressions[ Math.floor(Math.random()*expressions.length) ];
		
	expression.innerHTML = selected.innerHTML;
	expression.className = selected.className;
}

window.onload = function() {
	expression = document.getElementById("expression");
	expressions = document.getElementById("expressions").children;
		
	window.setInterval(reExpress,3000);
	
};