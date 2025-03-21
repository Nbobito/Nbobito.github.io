var outputspace = document.getElementById("hashed")
var k = 0
var input = document.getElementById("hasher")
var processinput
document.addEventListener("keypress", function (event){
    if(event.keyCode == 13){
    input = document.getElementById("hasher")
    processinput = input.value
    var nodeoutput 
    var node = document.createElement("div")    
    if(k==0){
        nodeoutput = outputspace.insertBefore(node,outputspace.children[0])
    }
    else{
        nodeoutput = outputspace.appendChild(node)
        k =0
    }
    outputspace.children[k].classList = "output"
    nodeoutput.innerText = processinput.hashCode()
    outputspace.appendChild(this.createElement("br"))
    input = document.getElementById("hasher")
    input.value=""
    }

})
function $(str){
    return document.getElementById(str)
}
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}