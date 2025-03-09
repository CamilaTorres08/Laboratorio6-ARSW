const apimock=(function(){

	var mockdata=[];

    mockdata["johnconnor"] = [
        {author: "johnconnor", points: [
            {"x":150, "y":120}, {"x":215, "y":115}, {"x":215, "y":180}, {"x":150, "y":180}, {"x":150, "y":120}
        ], name: "house"},
        {author: "johnconnor", points: [
            {"x":340, "y":240}, {"x":360, "y":220}, {"x":380, "y":240}, {"x":360, "y":260}, {"x":340, "y":240}
        ], name: "gear"},
        {author: "johnconnor", points: [
            {"x":100, "y":200}, {"x":180, "y":200}, {"x":180, "y":220}, {"x":100, "y":220}, {"x":100, "y":200}
        ], name: "car"},
        {author: "johnconnor", points: [
            {"x":50, "y":50}, {"x":90, "y":50}, {"x":90, "y":80}, {"x":50, "y":80}, {"x":50, "y":50}
        ], name: "tower"}
    ];
    
    mockdata["maryweyland"] = [
        {author: "maryweyland", points: [
            {"x":140, "y":140}, {"x":180, "y":140}, {"x":180, "y":180}, {"x":140, "y":180}, {"x":140, "y":140}
        ], name: "house2"},
        {author: "maryweyland", points: [
            {"x":140, "y":140}, {"x":160, "y":120}, {"x":180, "y":140}, {"x":160, "y":160}, {"x":140, "y":140}
        ], name: "gear2"},
        {author: "maryweyland", points: [
            {"x":200, "y":150}, {"x":250, "y":150}, {"x":270, "y":180}, {"x":180, "y":180}, {"x":200, "y":150}
        ], name: "bridge"},
        {author: "maryweyland", points: [
            {"x":300, "y":350}, {"x":350, "y":350}, {"x":350, "y":400}, {"x":300, "y":400}, {"x":300, "y":350}
        ], name: "factory"}
    ];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();
export default apimock;