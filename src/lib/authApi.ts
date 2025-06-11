async function getData() {
  const url = "http://localhost/api/auth/ok";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await res.json();
    console.log(json)
    return {json, error: null}
  } catch (error: unknown) {
    console.error(error.message);
    return {json: null, error}
  }
}

const json = await getData()
console.log(json)

export { };
