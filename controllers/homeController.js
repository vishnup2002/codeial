taskList = [
    {
        name:"Hello1",
        no:889
    },
    {
        name:"Hello2",
        no:889
    },

]

module.exports.home = function(req,res){
    return res.render('index',{
        tasks : taskList
    })
}