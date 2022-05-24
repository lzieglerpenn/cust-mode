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
    var aggY = yval.concat('_', agg);
    var data_update = {
		  'x': [groupedData[xval].values],
      'y': [groupedData[aggY].values]
    };

	Plotly.update(chartDiv, data_update, layout_update);

  },

  openEars: function() {
    // make X-Y axis mandatory in order for event listeners to work. Agg function should be optional
    // must Open Ears in order to take input. Otherwise can just use other df stuff to make plots
    // add event listener for whichever element has xaxis class & yaxis class & optionally agg class
    try {
      var xel = document.getElementsByClassName("xaxis")[0];
    } catch(err) {
      console.log(err);
      var xel = False;
    }
    try {
      var yel = document.getElementsByClassName("yaxis")[0];
    } catch(err) {
      console.log(err);
      var yel = False;
    }
    try {
      var aggel = document.getElementsByClassName("agg")[0];
    } catch(err){
      console.log(err);
      var aggel = False;
    }
    
    if (aggel) {
      aggel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, yel.dataset.plot, eval(yel.dataset.df), agg=aggel.value));
    } else {
      var aggel = False;
    }
    // add event listener if xaxis class exists on an input
    if (xel && aggel) {
      xel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, xel.dataset.plot, eval(xel.dataset.df), agg=aggel.value));
    } else if (xel) {
      xel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, xel.dataset.plot, eval(xel.dataset.df)));
    } else {
      var xel = False;
    }

    // add event listener if yclass exists on an input
    if (yel && aggel) {
      yel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, yel.dataset.plot, eval(yel.dataset.df), agg=aggel.value));
    } else if (yel) {
      yel.addEventListener('change', pennviz.updateTrace(xel.value, yel.value, yel.dataset.plot, eval(yel.dataset.df)));
    } else {
      var yel = False;
    }
  }

    
};



console.log('pennviz loaded');