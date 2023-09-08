function getRandImg() {
    $.get("../messenger.json", (data) => {
        let count = Object.keys(data).length;
        console.log(count);
        let randIndex = Math.floor(Math.random() * count);
        console.log(randIndex);
 
        $("#randImg").attr(`href`, "assets/img/" + data[randIndex]);
        console.log($("#randImg").attr(`href`));
    })
}
setInterval(() => {
    getRandImg();
},1000)




setInterval(() => {
    $.get("../messenger.json", (data) => {
        console.log(data);
        $("p").text(data);
    });
}, 60000)




