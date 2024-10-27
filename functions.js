//Is logged in


//logs in user
async function loginUser(username, password) {
    let url = "http://127.0.0.1:3000/api/login";

    //const response = await fetch(url);
    //const data = await response.json();
    const userData = {username, password};
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(userData)
       
    });
    const data = await response.json();
    console.dir(data);

    if (data.response){
        window.sessionStorage.setItem("token", data.response.token);
        console.log("token set: " + data.response.token);    
    }
    
    return data;
};

//registrate user
async function registrerUser(firstname, lastname, email, username, password) {
    let url = "http://127.0.0.1:3000/api/register";
    
    let user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    }; 
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(user)
    });
    
    const data = await response.json();
    console.log(data);
    return data;
};

//Gets data from database
async function getData() {
    let url = "http://127.0.0.1:3000/api/menu";
    let token = window.sessionStorage.getItem("token");

    console.log("token sent: " + token);
    const response = await fetch(url, {

        headers: {
            "Authorization": "Bearer " + token
        },
    });
    const data = await response.json();
   
    
    return data;
};
//gets menu items by category
async function getMenuItemsByCategory(category) {
    let url = "http://127.0.0.1:3000/api/menu?category=" + category;
    let token = window.sessionStorage.getItem("token");

    console.log("token sent: " + token);
    const response = await fetch(url, {

        headers: {
            "Authorization": "Bearer " + token
        },
    });
    const data = await response.json();
   
    
    return data;
};

//gets a specific menu item
async function getMenuItem(id) {
    let url = "http://127.0.0.1:3000/api/menu";

    const response = await fetch(url);
    const data = await response.json();
    
    for (let i=0; i<data.length; i++) {
        if (data[i]._id == id) {
            return data[i];
        }
    }

    if (!response.ok) {
        throw new Error(data);
    }

};

//gets a specific menu item category
async function getMenuCategory(type) {
    
    let url = "http://127.0.0.1:3000/api/menu";

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    for (let i=0; i<data.length; i++) {
        if (data[i].type == type) {
            return data[i];
        }
    }

    if (!response.ok) {
        throw new Error(data);
    }

};

//creates new menu item
async function createMenuItem(name, type, description, prize) {
    let url = "http://127.0.0.1:3000/api/menu";
    let token = window.sessionStorage.getItem("token");

    let menuItem = {
        name: name,
        type: type,
        description: description,
        prize: prize
    }; 
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(menuItem)
    });
    
    const data = await response.json();
    return data;
}

//changes a menu item
async function changeMenuItem(id, name, type, description, prize) {
    let url = "http://127.0.0.1:3000/api/menu/" + id;
    let token = window.sessionStorage.getItem("token");
    
    let menuItem = {
        id: id,
        name: name,
        type: type,
        description: description,
        prize: prize
    };  

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "Application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(menuItem)
    })
    
    const data = await response.json();
    console.log(token);
    console.log(menuItem);
    console.log(data);
    return data;

}

//deletes a menu item
async function deleteMenuItem(id) {
    let url = "http://127.0.0.1:3000/api/menu/" + id;
    let token = window.sessionStorage.getItem("token");
    
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "content-type": "Application/json",
            "Authorization": "Bearer " + token
        },
       
    });

    if (!response.ok) {
        throw new Error("somethig went wrong");
    }

    window.location.reload();
}


