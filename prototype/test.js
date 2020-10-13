function a() {  
    var i = 1  
    return function() {
        console.log(i); //输出1
        console.log(this) // 输出2
    }
}
var i = 2
a()()