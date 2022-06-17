// --------- DEPENDENT on [[alamode, danfo, AlaSQL, & Plotly]] libraries ------------ //
var pennpull = {
  
  loadQueryData: function(queryName){
    var holder = alamode.getDataFromQuery(queryName);
    var df = new dfd.DataFrame(holder);
    return df
  },

  mergeQuerys: function(left_query, right_query, on, how='INNER'){
      var left = alamode.getDataFromQuery(left_query);
      var right = alamode.getDataFromQuery(right_query);
      var q = `SELECT a.*, b.* FROM ? a ${how} JOIN ? b ON a.${on}=b.${on}`;
      var merged = alasql(q, [left, right]);
      var merged_df = new dfd.DataFrame(merged);
      return merged_df
  }

}

var pennviz = {

  simpleExplore: function(xval, yval, chartDiv, leftQueryName, agg='sum', plotType='bar', rightQueryName, on, how="INNER") {
    if (rightQueryName) {
      var df = pennpull.mergeQuerys(leftQueryName, rightQueryName, on, how);
    } else {
      var df = pennpull.loadQueryData(leftQueryName);
    }
    console.log(df);
    var selectedData = df.loc({columns: [xval, yval]});
    var layout_update = {
      title: 'Unbridled Exploration!', // updates the title
    };
    var groupedData = selectedData.groupby([xval]).sum();
    var aggY = yval.concat('_', agg);
    var data_update = {
		  'x': [groupedData[xval].values],
      'y': [groupedData[aggY].values],
      'type': plotType
    };

	Plotly.update(chartDiv, data_update, layout_update);

  }

  

    
};

var pennlisten = {

  openEars: function(listen='simpleListen') {
    // make X-Y axis mandatory in order for event listeners to work. Agg function should be optional
    // must Open Ears in order to take input. Otherwise can just use other df stuff to make plots
    // add event listener for whichever element has xaxis class & yaxis class & optionally agg class

    // create function to run this one for simpleExplore
    function simpleListen() {
          // get possible listening elements
          var xel = document.getElementsByClassName("xaxis")[0];
          var yel = document.getElementsByClassName("yaxis")[0];
          var aggel = document.getElementsByClassName("agg")[0];
          var typel = document.getElementsByClassName("ptype")[0]; 

          // create array with required & optional listeners
          var els = [xel, yel];
          if (aggel) {
            els.push(aggel);
            var aggval = aggel.value;
          } else {
            var aggval = 'sum';
          }
          if (typel) {
            els.push(typel);
            var typval = typel.value;
          } else {
            var typval = 'bar';
          }

          // add event listeners for all existences
          for (item in els) {
            // console.log(els[item]);
            // console.log(els[item].value);
            if (els[item]) {
              els[item].addEventListener('change', 
              pennviz.simpleExplore(
                xel.value, 
                yel.value, 
                els[item].dataset.plot, 
                els[item].dataset.df, 
                agg=aggval, 
                plotType=typval)
                );
            } else {
              console.log('no item listener');
            };
          }
      // end of simpleListen Function
      };
      // run function from openEars input
      // eval(listen);
      simpleListen();
      console.log('Listen attempt!');
          //  end of open Ears

  }


};

console.log('pennviz loaded');