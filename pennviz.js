// dependent on alamode & danfo libraries
var pennviz = {
  
  loadQueryData: function(queryName){
    var holder = alamode.getDataFromQuery(queryName);
    var df = new dfd.DataFrame(holder);
    return df
  }

  mergeQuerys: function(left_query, right_query, on, how='inner'){
      var left = loadQueryData(left_query);
      var right = loadQueryData(right_query);
      var merged_df = dfd.merge(left, right, on, how);
      return merged_df
  }


  
};

console.log('pennviz loaded');