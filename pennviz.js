// dependent on alamode & danfo libraries
var pennviz = {
  
  loadQueryData: function(queryName){
    var holder = alamode.getDataFromQuery(queryName);
    var df = new dfd.DataFrame(holder);
    return df
  },

  mergeQuerys: function(left_query, right_query, on, how='inner'){
      var left = loadQueryData(left_query);
      var right = loadQueryData(right_query);
      var merged_df = dfd.merge(left, right, on, how);
      return merged_df
  },

  updateTrace: function(xval, yval, chartDiv, dfName, agg='sum') {
    var selectedData = dfName.loc({columns: [xval, yval]});
    var layout_update = {
      title: 'some new title', // updates the title
    };
    // probs need to group by and shit
    var groupedData = selectedData.groupby([xval]).sum();
    var data_update = {
		  'x': [groupedData[xval]],
      'y': [groupedData[yval]]
    };

	Plotly.update(chartDiv, data_update, layout_update);

  }


    
};

// add event listener for whichever element has xaxis class & yaxis class
var xel = document.getElementsByClassName("xaxis")[0];
var yel = document.getElementsByClassName("yaxis")[0];
// need to add data-df and data-plot
xel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, xel.dataset.plot, eval(xel.dataset.df)));
yel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, yel.dataset.plot, eval(yel.dataset.df)));




console.log('pennviz loaded');