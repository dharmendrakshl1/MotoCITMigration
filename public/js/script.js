$(document).ready(function(){


//chethana code-------------------------------------------------------------------------------------------*****************----------------------------------------------
$( document ).on( "click", ".del", function( event ) 
	{
		$(this).parent().parent().remove();
	});
	
    $("#LoadButton").click(function()
    {
    	//alert($("#selectedRecipeXmlId option:selected" ).val());
    	$id=$("#selectedRecipeXmlId option:selected" ).val()
    	
        $.post("/RESTWSRecipeGeneration?id="+$id,function(data)
        {
        
	  		$('#content').val($("#selectedRecipeXmlId option:selected" ).val());
	  		
	  		  		   		
	  		var jsonString = JSON.stringify(data);
	  		
	  		//$("#tableId > tbody > tr").remove();
	  		$('#tableId').dataTable().fnClearTable();
	   		for(i=0; i<data.length;i++)
	  		{
		  		var v= i+1; 		  		  		
	//  		$('#tableBodyID').append('<tr class="row1"><td align="center">'+v+'</td><td align="center">'+data[i].STEP_DETAILS+'</td>'+
	//  			'<td align="center"><input class="frontend" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="backend" type="checkbox"  STYLE="background-color:"#C5EFF7"/></td>'+
	//  			'<td align="center"><input class="nocomplain" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="audioalert" type="checkbox" STYLE="background-color:"#C5EFF7"/></td>'+
	//  			'<td align="center"><input class="battery" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="bluetooth" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="camera" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="charging" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="displaykeyboard" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="memorycard" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="poweronoff" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="simcard" type="checkbox" /></td>'+
	//  			'<td align="center"><input class="wifi" type="checkbox" /></td>'+
	//  			'<td align="center"><input type="button" name="delete" value="delete" class="del deleteRecipe"><strong> </strong></td>'+
	//  			'</tr>')
	  		
  				$tableRows = '<tr class="row1"><td align="center">'+v+'</td><td align="center">'+data[i].STEP_DETAILS+'</td>'+
	  			'<td align="center"><input class="frontend" type="checkbox"'; 
  				
  				if(data[i].FRONTEND=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + ' /></td>'+
	  			'<td align="center"><input class="backend" type="checkbox" STYLE="background-color:"#C5EFF7" '; 
  				
  				if(data[i].BACKEND=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="nocomplain" type="checkbox"'; 
  				
  				if(data[i].NO_COMPLAINT=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="audioalert" type="checkbox" STYLE="background-color:"#C5EFF7" ';
  				
  				if(data[i].AUDIO_ALERT=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="battery" type="checkbox"  ';
  				
  				if(data[i].BATTERY=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="bluetooth" type="checkbox"  ';
  				
  				if(data[i].BLUETOOTH=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="camera" type="checkbox"  ';
  				
  				if(data[i].CAMERA=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="charging" type="checkbox"  ';
  				
  				if(data[i].CHARGING=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="displaykeyboard" type="checkbox" '; 
  				
  				if(data[i].DISPLAY_KEYBORED=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="memorycard" type="checkbox"  ';
  				
  				if(data[i].MEMORY_CARD=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="poweronoff" type="checkbox"  ';
  				
  				if(data[i].POWER_ON_OFF=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="simcard" type="checkbox"  ';
  				
  				if(data[i].SIM_CARD=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input class="wifi" type="checkbox"  ';
  				
  				if(data[i].WIFI=="true")
				{
  					$tableRows = $tableRows + ' checked ';
				}
  				
  				$tableRows = $tableRows + '/></td>'+
	  			'<td align="center"><input type="button" name="delete" value="delete" class="del deleteRecipe"><strong> </strong></td>'+
	  			'</tr>';
	  			
	  			$('#tableBodyID').append($tableRows);
	  			
	  		} 
  		
//		for(i=0; i<data.length;i++)
//		{
   		
//  		var i=0;
//  			$('#tableId > tbody  > tr').each(function()
//  			{
//  			$td=0
//  			$(this).find('td').each (function() {
//  			
//  			if($td==2)
//  			{
//  							if(data[i].FRONTEND=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==3)
//  			{
//  							if(data[i].BACKEND=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==4)
//  			{
//  							if(data[i].NO_COMPLAINT=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==5)
//  			{
//  							if(data[i].AUDIO_ALERT=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==6)
//  			{
//  							if(data[i].BATTERY=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==8)
//  			{
//  							if(data[i].CAMERA=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==7)
//  			{
//  							if(data[i].BLUETOOTH=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==9)
//  			{
//  							if(data[i].CHARGING=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==10)
//  			{
//  							if(data[i].DISPLAY_KEYBORED=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==11)
//  			{
//  							if(data[i].MEMORY_CARD=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==12)
//  			{
//  							if(data[i].POWER_ON_OFF=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==13)
//  			{
//  							if(data[i].SIM_CARD=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//  			if($td==14)
//  			{
//  							if(data[i].WIFI=="true")
//  							{
//  								$(this).find('input').attr('checked',true);
//  							}
//  			}
//			$td++	
//			});
//  			i++;
//  			});
  		
  		//}//End of for
  		
  	   });//End of post
    });//End of button click
    
    //Selecting 
    var flag=false;
   
		   $('.row').click(function () {
		 		flag = true;
		 			 if($(this).attr('class').indexOf('colour') != -1)
				    	{
						 $(this).removeClass("colour");
				    	}
					 	else
						{
					
							$add =false;
							$previousColor=false;
							$nextColor=false;
					
							if(Number($(this).index()+1)!=1)
							{
						    	if($(this).prev().attr('class').indexOf('colour') != -1)
						    	{
									$previousColor =true;
						    	}
						    
							}
							
							if(Number($(this).index()+1)!=Number($(this).parent().children().last().index()))
							{
						 		if($(this).next().attr('class').indexOf('colour') != -1)
					    		{
							 		$nextColor = true;
					    		}
							
						
							}
					
					if($previousColor==true)
						{
						
							$add = true;
						
						}
					else if($nextColor==true)
						{
							$add = true;
						}
						
					if(!$add)
						{
						$(this).parent().children().each(function(){
				 			$(this).removeClass("colour");
							});
						}
		 		//alert($add);
					$(this).addClass("colour");
						 }
		});
    
    $('.Up').click(function () {
			   
			   if(!flag)
				   alert("Please click on any row from table");
				   $move=false;
				   				   
				   var row = $('tr.colour:first', '#tableId');
				
	               $rows = $('tr.colour', '#tableId');
				   
				   //End newly added by Thammaaih
				   $className=row.prev().attr('class');
				   
				   if($className=="row")
					   {
					   $move=true;
					   }
				   //end newly added
				   if($move)
					   {
					   $rows.insertBefore(row.prev());
					   $counter=0;
					     $('#tableId > tbody  > tr').each(function()
						  {
							  $row1 = $(this);
							  $row1.find('td input[type="checkbox"]').each (function() {
								  $nameValue = $(this).attr('name');
								  $rowName = $nameValue.substring(0,11);
								  $(this).attr('name',$rowName+$counter);
								  
							  });
							  
							  $counter++;  
						});
						  
					   }

		   });
		   
	$('.Down').click(function () {
			   if(!flag)
				   alert("Please click on any row from table");
			   var row = $('tr.colour:last', '#tableId');
			   $rows =new Array();
               $rows = $('tr.colour', '#tableId');
			   
			     $move=false;
				   $className=row.next().attr('class');
				   if($className=="row")
				   {
				   $move=true;
				   }
				   //end newly added
				  
				   if($move)
				   {
					   $rows.insertAfter(row.next());
					   $counter=0;
					     $('#tableId > tbody  > tr').each(function()
						  {
							  $row1 = $(this);
							  $row1.find('td input[type="checkbox"]').each (function() {
								  $nameValue = $(this).attr('name');
								  $rowName = $nameValue.substring(0,11);
								  $(this).attr('name',$rowName+$counter);
								  
							  });
							  
							  $counter++;  
						});
					  
				   }

		   });
    
    
    
    //chethana code-------------------------------------------------------------------------------------------*****************----------------------------------------------
	
	//to reload page for new recipe
	
    $("#newButton").click(function(){
    	location.reload();
    });
    
	//Change checkbox state of all rows via table header
	$(".allCB").click(function(event)
	{
		
		//get selected column
		$column = $(this).closest("th");
		$columnIndex = $column.index();
		
		//get all available rows of the table
		$rows = $(".deleteRecipe").closest("tr");

		//identify if the checkboxes need to be checked or unchecked.
		if ( $(this).is(":checked") ) 
		{
			$setCheckBox = true;
		}
		else
		{
			$setCheckBox = false;
		}
		
		//iterate over the remaining rows and change their property with $setCheckBox.
		if ( $rows.length > 0 )
		{
				for( $i=0; $i < $rows.length; $i++ )
				{			
					$ele = $( $( $( ".deleteRecipe" ).parent().parent() )[ $i ] ).children(); 
					$ele.eq($columnIndex).children("input[type=checkbox]").prop("checked", $setCheckBox);
				}
		}
	});	
    
    
    
  
});

$("#newButton").click(function(){
	    	location.reload();
});


//Convert table data as form input data for form submission
function createRecipeList()
{

	//identify rows with selected contents
	$rows = $(".deleteRecipe").closest("tr").filter(':has(:checkbox:checked)');
	$tClengthID=0;
	//iterate over selected rows and generate string of inputs for submission for each row
	if ( $rows.length > 0 )
	{
		$str = '[';
		var $i=0;
			
		for( $i=0; $i < $rows.length; $i++ )
		{
						
			//$ele = $( $( $( ".deleteRecipe" ).parent().parent() )[ $i ] ).children();
			$ele = $($rows[$i]).children();
			
			$str = $str + '{ "testCase" : "' + $ele.eq(1).html().trim() + '",'  
			+ '"frontEnd" : "' + $ele.eq(2).children().is(":checked") + '",'	
			+ '"backEnd" : "' + $ele.eq(3).children().is(":checked") + '",'	
			+ '"complaint" : "' + $ele.eq(4).children().is(":checked") + '",'	
			+ '"audioAlert" : "' + $ele.eq(5).children().is(":checked") + '",'	
			+ '"battery" : "' + $ele.eq(6).children().is(":checked") + '",'	
			+ '"bluetooth" : "' + $ele.eq(7).children().is(":checked") + '",'	
			+ '"camera" : "' + $ele.eq(8).children().is(":checked") + '",'	
			+ '"charging" : "' + $ele.eq(9).children().is(":checked") + '",'	
			+ '"displayKeypad" : "' + $ele.eq(10).children().is(":checked") + '",'	
			+ '"memoryCard" : "' + $ele.eq(11).children().is(":checked") + '",'	
			+ '"powerOnOff" : "' + $ele.eq(12).children().is(":checked") + '",'	
			+ '"simCard" : "' + $ele.eq(13).children().is(":checked") + '",'	
			+ '"wifi" : "' + $ele.eq(14).children().is(":checked") + '"'	
			+'}';
			
			if ( $i != ($rows.length -1) )
			{
				$str = $str + ',';	
			}
		}
	}
	$tClengthID=$i;	
	$str = $str + "]"
	
	//alert($str);
	$generatedJsonString = "<input type='hidden' name='recipeString' id='recipeString' value='" + $str + "' />";
	
	$("#generatedRecipeListContainer").html($generatedJsonString);
	$("#tClengthID").val($tClengthID);
}


// javascript code

$(document).ready(function(){
    $('.sidebar-nav li').click(function(e){
        e.preventDefault();               
        $(".sidebar-nav li.active").removeClass("active");
        $(this).addClass('active');
    });

    $('.fa').click(function(){
        $(this).toggleClass('fa-arrow-circle-left fa-arrow-circle-right');
            
    }); 
});

$('.dropdown-href').click(function(e) {
	console.log("Clicked");
});

//menu page options
$(document).ready(function () {
    $('.dropdown-toggle').mouseover(function() {
        $('.dropdown-menu').show();
    })

    $('.dropdown-toggle').mouseout(function() {
        t = setTimeout(function() {
            $('.dropdown-menu').hide();
        }, 100);

        $('.dropdown-menu').on('mouseenter', function() {
            $('.dropdown-menu').show();
            clearTimeout(t);
        }).on('mouseleave', function() {
            $('.dropdown-menu').hide();
        })
    })
})
