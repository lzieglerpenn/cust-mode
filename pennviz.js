// dependent on alamode & danfo libraries
var pennviz = {
  
  loadQueryData: function(queryName){
    var holder = alamode.getColumnsFromQuery(queryName);
    var df = new dfd.DataFrame(holder);
    return df
  }
  
};

console.log('pennviz loaded');
