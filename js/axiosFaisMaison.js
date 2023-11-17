export const axios = {
    // url: "https://dummyjson.com/todos",
    url: "http://localhost:8088/todolist",

    getWithCallback: async function(callback) {
      try {
        const response = await fetch(axios.url);
        callback(await response.json())
      } catch (err) {
        console.error(err);
      }
    },

    get: async function() {
      try {
        const response = await fetch(axios.url);
        return response.json();;
      } catch (err) {
        console.error(err);
      }
    }      

    // post: 
    // put:
    // delete:
}
