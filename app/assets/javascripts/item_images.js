$(document).on('turbolinks:load', function() {

  $('#item_images').on('change',function(e){
    var file = e.target.files[0];
    Uploader.upload(file).done(function(data){
      console.log("done");
      previewImage(file, data.image_id);
    });
    $('#item_images').val('');
  });

  $('.images_field').on('click','.btn-edit', function(e){
    e.preventDefault();
    $(this).parent().find('.edit-image-file-input').trigger("click");
  });

  $('.images_field').on('change','.edit-image-file-input', function(e){
    var file = e.target.files[0];
    var image_box = $(this).parent();
    Uploader.upload(file).done(function(data){
      console.log("edit done");
      replaceImage(file, data.image_id, image_box);
    });
  });

  $('.images_field').on('click','.btn-delete', function(e){
    e.preventDefault();
    $(this).parent().remove();
  });

  function replaceImage(imageFile, image_id, element){
    var reader = new FileReader();
    var img = element.find('img');
    var input = element.find('.item-images-input');
    var filename = element.find('p');
    reader.onload = function(e){
      input.attr({value: image_id});
      filename.html(imageFile.name);
      img.attr("src", e.target.result);
    }
    reader.readAsDataURL(imageFile);
  }

  function previewImage(imageFile, image_id){
    var reader = new FileReader();
    var img = new Image();
    reader.onload = function(e){
      img.onload = function(){
        var image_box = $('<div>',{class: 'image-box'}).css("width", "150px");
        $(img).css('width','150px');
        image_box.append(img);
        image_box.append($('<p>').html(imageFile.name));
        image_box.append($('<input>').attr({
              name: "item[images][]",
              value: image_id,
              style: "display: none;",
              type: "hidden",
              class: "item-images-input"}));
        image_box.append('<a href="" class= "btn-edit">Edit</a>');
        image_box.append($('<input>').attr({
              name: "edit-image[]",
              style: "display: none;",
              type: "file",
              class: "edit-image-file-input file-input"}));
        image_box.append('<a href="" class="btn-delete">Delete</a>');
        $('.images_field').append(image_box);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  }

  var Uploader = {
    upload: function(imageFile){
      var def =$.Deferred();
      var formData = new FormData();
      formData.append('image', imageFile);
      $.ajax({
        type: "POST",
        url: '/items/upload_image',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: def.resolve
      })
      return def.promise();
    }
  }
})
