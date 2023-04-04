const checkNumeric = (v) => {
	if (/^\d*\.?\d*$/.test(v.toString())) {
		return v;
	}
	return ''
}

const checkStringLength = (v, m) => {
	if (v.toString().length > m) {
		return v.substring(0, m);
	}
	return v
}