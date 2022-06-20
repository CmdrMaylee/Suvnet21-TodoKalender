let myToggles = document.querySelectorAll(".toggle");
let myLabels = document.querySelectorAll(".lbl-toggle");

Array.from(myLabels).forEach(label => {
	label.addEventListener("keydown", e => {
		// 32 === spacebar
		// 13 === enter
		if (e.which === 32 || e.which === 13) {
			e.preventDefault();
			label.click();			
		}
	});
});

function setCheckbox(myMediaQuery) {
	if (myMediaQuery.matches) {
		// If media query matches
		Array.from(myToggles).forEach(check => {
			check.checked = true;
		});
	}
}

let myMediaQuery = window.matchMedia("(min-width: 480px)");
setCheckbox(myMediaQuery); // Call listener function at run time
myMediaQuery.addListener(setCheckbox); // Attach listener function on state changes
