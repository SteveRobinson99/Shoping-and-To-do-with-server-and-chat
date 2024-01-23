// following generates a base36 (0-9 and a-z) string, then snips off the '0.' at the start and makes it 8 char long (each is a 0-9 OR a-z) i.e. 8 random-char letter or number
const generateRandomID = () => Math.random().toString(36).substring(2, 10);

export default generateRandomID;