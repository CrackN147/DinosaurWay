const get = (key) => {
	return localStorage.getItem(key);
}
const exists = (key) => {
	return get(key) !== null;
}
const length = () => {
	return localStorage.length;
}
const getJson = (key) => {
	return JSON.parse(get(key));
}
const set = (key, val) => {
	return localStorage.setItem(key, val);
}
const remove = (key) => {
	return localStorage.removeItem(key);
}
const clear = () => {
	return localStorage.clear();
}