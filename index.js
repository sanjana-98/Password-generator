let theslider = document.querySelector('#slide')
let pwdlen = document.querySelector("#len")
let indicator = document.querySelector(".pwdstrength");
let butn = document.querySelector('#btn');
let upp = document.querySelector('#upper');
let low = document.querySelector('#lower');
let num = document.querySelector('#nums');
let sym = document.querySelector('#symb');
let cli = document.querySelector('#clip');
let copmsg = document.querySelector('#copiedmsg');
let checkb = document.querySelectorAll('.check');
let imag = document.querySelector('.image');
let copybt = document.querySelector("#copyBtn");
let passwordlen = 10;
handleSlider();

function handleSlider() {
    theslider.value = passwordlen;
    pwdlen.innerText = passwordlen;
    let mini = theslider.min;
    let maxi = theslider.max;
    theslider.style.backgroundSize = ((passwordlen-mini)*100/(maxi-mini)) + "% 100%"
    
}

theslider.addEventListener('input',function(e){
    passwordlen = e.target.value;
    handleSlider();
});


function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min))+min
            // min =1 max =9
            //    (0-1*(9-1))+1
            //( 0+1 to (9-1)+1)
            // 1-9
};

function generatenum() {
    return getRandomNum(0,10);
};
    

function generatelowercase() {
    return String.fromCharCode(getRandomNum(97,123));
    
}
function generateuppercase() {
    return String.fromCharCode(getRandomNum(65,91));
};

function generateSym(){
    return String.fromCharCode(getRandomNum(33,47))
    
}


butn.addEventListener('click',function(){
    if(upp.checked==true && pwdlen.innerText>=8 && low.checked==true && (num.checked==true||sym.checked==true)){
        indicator.style.backgroundColor="green";
        indicator.style.boxShadow = '0px 0px 12px 1px green';
    }
    else if((upp.checked==true||low.checked==true) && (num.checked==true||sym.checked==true) && pwdlen.innerText>=6){
        indicator.style.backgroundColor="yellow";
        indicator.style.boxShadow = '0px 0px 12px 1px yellow';
    }
    else{
        indicator.style.backgroundColor="pink";
        indicator.style.boxShadow = '0px 0px 12px 1px pink';
    }
});

async function copyClip() {
    
    await navigator.clipboard.writeText(cli.value);
    copmsg.innerText = "Copied"; 

    copmsg.classList.add("active");
    setTimeout(() => {
        copmsg.classList.remove("active");
    }, 2000);

}

copybt.addEventListener('click', function() {
    if(cli.value){
        copyClip();
    }
    
    
})

function handleCheckBoxChange(){
    checkCount=0;
    checkb.forEach( (ele) => {
        if(ele.checked)
            checkCount++
    });
    if(passwordlen<checkCount){
        passwordlen = checkCount;
        theslider.value = checkCount;
        pwdlen.innerText = checkCount;
    }

}
            
checkb.forEach((element) => {
    element.addEventListener('change',handleCheckBoxChange)
})
        
        
       
   

butn.addEventListener('click',function() {
    
    // none of checkbox ticked
    // if (checkCount<=0){
    //     return;
    // }
    password = ""
    
    if(upp.checked==true){
        password+=generateuppercase();
    }

    if(low.checked==true){
        password+=generatelowercase();
    }

    if(sym.checked==true){
        password+=generateSym();
    }

    if(num.checked==true){
        password+=generatenum();
    }
    if(password.length <theslider.value){
        arr=[]
        if(upp.checked==true){
            arr.push('u')
        }
    
        if(low.checked==true){
            arr.push('l')
        }
    
        if(sym.checked==true){
            arr.push('s')
        }
    
        if(num.checked==true){
            arr.push('n')
        }
        console.log(arr);

        s = theslider.value-password.length
        for (let index = 0; index < s; index++) {
            
            randomIndex = Math.floor(Math.random() * arr.length);

            item = arr[randomIndex];
            if(item=='u'){
                password+=generateuppercase();
            }
            else if (item=='l') {
                password+=generatelowercase();
            }
            else if(item=='n') {
                password+=generatenum();
            }else if(item=='s'){
                password+=generateSym()
            }
        }

    }//bracket for if pwd length
    cli.value = password
    
});


