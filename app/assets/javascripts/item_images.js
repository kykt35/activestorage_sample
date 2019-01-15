$(document).on('turbolinks:load', function() {

  $('.file_input').on('change',function(e){
    var files = e.target.files;
    var d = (new $.Deferred()).resolve();
    $.each(files,function(i,file){
      d = d.then(function(){return previewImage(file)});
    });
  })

  function previewImage(imageFile){
    var reader = new FileReader();
    var img = new Image();
    var def =$.Deferred();
    reader.onload = function(e){
      img.onload = function(){
        $(img).css('width','150px');
        $('.images_field').append(img);
        def.resolve(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
    return def.promise();
  }
})
