
const DEFAULT = "api/v1/todos"                  //serviva con il tuo link, servirà.
const URL = "http://demo1526987.mockable.io/"


export const getToDoList = () => {
    // se passo una stringa mi chiama il servizio come fosse una GET
    return fetch(URL).then(res => res.json())/*.then(json => json.body)*/
}


/* esempio di possibile response

const json = {
    body: {
        listaTodos: [

        ]
    }
}*/


/*

ESEMPIO DI PROMISE FATTA A MANO

const sommaDaFileAsync = new Promise((resolve, reject) => {
    /!*... logica ...*!/
    const somma = 5
    const messaggioErrore = 'Impossibile calcolare la somma'
    somma  > 10 ? resolve(somma) : reject(messaggioErrore)
})*/

/*
fetch(url)
    .then(response => response.json())
    .then(data => data.photos.photo.map((x) => {

        this.setState({
            farm: x.farm,
            id: x.id,
            secret: x.secret,
            server: x.server
        })
    }))

/*
export const getToDoList = async () => {
      let res = await axios.get(URL);
      let posts = res.data;
      return  posts.map((post, i) => {
        return (
          <li key={i} className="list-group-item">{post.text}</li>
        );
      });

}

*/
