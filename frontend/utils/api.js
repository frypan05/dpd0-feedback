const axios = require('axios');

async function getUser(){
    try{
        const response = await axios.get('/user?ID=1234')
        console.log(response)
    }catch(error){
        console.log(error)
    }
}
