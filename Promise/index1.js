new Promise(resolve=> {
    document.querySelector('button').addEventListener('click', e=>{
        resolve();
    });
}).then(()=>{
    return new Promise(resolve => {
        console.log("正在收藏")
        setTimeout(() => {
            console.log("ok");
            resolve();
        },2000);
    });
}).then(() => {
    console.log("+100");
}).catch(error => console.log(error));