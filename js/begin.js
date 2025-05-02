document.addEventListener('DOMContentLoaded', function(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('current user:', currentUser);
    if(currentUser){
        updateButtonDisplay(true);
    }else{
        updateButtonDisplay(false);
    }
    
});
function updateButtonDisplay(isuser){
    if(isuser){
        document.getElementById('signin').style.display = 'none';
        document.getElementById('signup').style.display = 'none';
        document.getElementById('accounty').style.display = 'inline-block';
        document.getElementById('logy').style.display = 'inline-block';

    }else{
        document.getElementById('signin').style.display = 'inline-block';
        document.getElementById('signup').style.display = 'inline-block';
        document.getElementById('accounty').style.display = 'none';
        document.getElementById('logy').style.display = 'none';
 
    }
}