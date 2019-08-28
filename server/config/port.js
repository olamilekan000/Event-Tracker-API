let PORT 

if (process.env.NODE_ENV === 'test') {
  PORT = 9096;
}else if (process.env.NODE_ENV === 'dev') {
	PORT = 9097
}else {
	PORT = 9095 || process.env.PORT
}

export default PORT;
