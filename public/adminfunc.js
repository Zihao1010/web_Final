$(document).ready(function(){
  $("a.delete").click(function(){
    var delete_url = "https://team-finalproject.glitch.me/admin/dish/" + $(this).attr('id');

    $.ajax({
            url:delete_url,
            type:'DELETE',
            timeout:5000,
            dataType:'text',
            success:function(data,textStatus,jqXHR){
              alert("Delete successfully!")
            },
            error:function(xhr,textStatus){ 
              console.log("error");
            }
        })
    
  });
  
  $("a.edit").click(function(){
    var edit_url = "https://team-finalproject.glitch.me/admin/edit/" + $(this).attr('id');
    window.open(edit_url);
  });
    
 
})
