const website = "http://127.0.0.1:8000/"
const input = document.querySelector("#story");
const keyChord = [false,false];

document.addEventListener('keydown', event => {
    if (event.key === 'Shift') {
        console.log("hit Shift");
        console.log(input.value);
        fetch(website+input.value)
            .then(response => response.json())
            .then(suggestions=>{
                console.log(suggestions);
                for (let i=1;i<6;i++){
                    document.getElementById(`${i}`).innerText=suggestions[i-1];
                }
            })
            .catch(err => console.log(err));
    }
    if (event.key === 'Control') {
        keyChord[0] = true;
        console.log(keyChord);
        setTimeout(()=>{
            keyChord[0] = false;
            console.log(keyChord);
        },1000);
    }
    if (['1','2','3','4','5'].includes(event.key)){
        console.log(event.key);
        keyChord[1]=true;
        console.log(keyChord);
        setTimeout(()=>{
            keyChord[1] = false;
            console.log(keyChord);
        },1000);
        if (keyChord[0]===true && keyChord[1]===true){
            event.preventDefault();
            input.value+=document.getElementById(event.key).innerText;
        }
    }
});
