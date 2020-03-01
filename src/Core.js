

let getUsers = () => {
    fetch('localhost:3002/users')
        .then((response) => {
            console.log("test");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log("test");
        });
}

export default getUsers;
