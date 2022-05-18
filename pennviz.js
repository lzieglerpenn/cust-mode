// dependent on alamode & danfo libraries
var pennviz = {
  
  loadQueryData: function(queryName){
    var holder = alamode.getColumnsFromQuery(queryName);
    return dfd.Dataframe(holder);
  }
  
};
