$(function(){
    if ($('textarea#myeditor').length) {
        // alert("dsa");
        CKEDITOR.replace('myeditor');

        
    }
    $('a.confirmdeletion').on('click',()=>{
        if (!confirm('Confirm Deletion'))
         {
             return false;
            
        }
    })
})