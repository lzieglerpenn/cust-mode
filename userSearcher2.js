var checkExist = setInterval(function() {
   if (document.getElementById("report_run_params_user_segment_type").length) {
       console.log("Exists!");
       clearInterval(checkExist);
   var usg = document.getElementById("report_run_params_user_segment_type");
   var idin = document.getElementById("report_run_params_ID_Input");
   var idli = document.getElementById("report_run_params_ID_List");
   var rre = document.getElementById("report_run_params_restrict_range_end");
   var rrs = document.getElementById("report_run_params_restrict_range_start");

     usg.addEventListener('change', function(){
     if (usg.value == 'ID_List') {
       idin.disabled = false; 
       idli.disabled = false;
       console.log('ids');
       } else {
         idin.disabled=true;
         idli.disabled = true;
         console.log('all else');
     }
   });
   }
}, 250);
