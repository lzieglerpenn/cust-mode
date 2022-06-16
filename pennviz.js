// dependent on alamode & danfo & Plotly libraries
var pennviz = {
  
  loadQueryData: function(queryName){
    var holder = alamode.getDataFromQuery(queryName);
    var df = new dfd.DataFrame(holder);
    return df
  },

  mergeQuerys: function(left_query, right_query, on, how='inner'){
      var holder1 = alamode.getDataFromQuery(left_query);
      var left = new dfd.DataFrame(holder1);
      var holder2 = alamode.getDataFromQuery(right_query);
      var right = new dfd.DataFrame(holder2);
      var merged_df = dfd.merge(left, right, on, how);
      return merged_df
  },

  simpleExplore: function(xval, yval, chartDiv, dfName, agg='sum', plotType='bar') {
    console.log(dfName);
    console.log('dfname above')
    var df = eval(dfName);
    console.log(df);
    var holder = alamode.getDataFromQuery("Query 1");
    var df_static = new dfd.DataFrame(holder);
    console.log('------------');
    console.log(df_static);
    var selectedData = df.loc({columns: [xval, yval]});
    var layout_update = {
      title: 'some new title', // updates the title
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