
let getScreenHeight = () => {
    let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return screenHeight;
}
