//expanding and shrinking tasks on click
var li = document.getElementsByClassName('task-main');
for (let i=0;i<li.length;i++){
    li[i].onclick = function(){
        console.log("clicked");
        console.log("#"+i)
        var options = document.getElementById(i);
        if (options.style.height == "0px"){
            options.style.height = "70px";
            options.style.paddingTop = "20px";
        }
        else{
            options.style.height = 0;
            options.style.paddingTop = 0;
        }
    };
}

//take to form page on clicking the button
var button = document.getElementById('add-task-button');
button.onclick = function(){
    location.href = "/task/task-form";
}