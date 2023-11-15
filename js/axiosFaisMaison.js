export const axios = {
    get:  async function dataFetch(callback) {
        try {
          const response = await fetch("https://dummyjson.com/todos");
          const data = await response.json();
          callback(data)
        //   return data;
        } catch (err) {
          console.error(err);
          // Vous pouvez choisir de renvoyer une valeur par défaut ou de propager l'erreur
          // Par exemple : return []; ou throw err;
        }
      }
}
