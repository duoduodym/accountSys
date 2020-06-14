import axios from 'axios'
export function login(params){  
    return new Promise((resolve, reject) => {         
        axios.post('/platform-admin/platform-users/login',params)        
        .then(res => {              
            resolve(res.data);        
        })        
        .catch(err => {       
            reject(err)        
        })    
    });
}