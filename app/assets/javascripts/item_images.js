$(document).on('turbolinks:load', function() {

  $('#item_images').on('change',function(e){
    var files = e.target.files;
    var d = (new $.Deferred()).resolve();
    $.each(files,function(i,file){
      d = d.then(function(){return previewImage(file)});
    });
    $('#item_images').val('');
  })

  function previewImage(imageFile){
    var reader = new FileReader();
    var img = new Image();
    var def =$.Deferred();
    reader.onload = function(e){
      img.onload = function(){
        var image_box = $('<div>',{class: 'image-box'}).css("width", "150px");
        $(img).css('width','150px');
        image_box.append(img);
        image_box.append($('<p>').html(imageFile.name));
        image_box.append('<a href="" class= "btn-edit">Edit</a>','<a href="" class="btn-delete">Delete</a>');
        $('.images_field').append(image_box);
        def.resolve();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
    return def.promise();
  }
})
