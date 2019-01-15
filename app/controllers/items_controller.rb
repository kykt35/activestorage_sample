class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  def index
    @items = Item.all.with_attached_images
  end

  def show
  end

  def new
    @item = Item.new
  end

  def edit
  end

  def create
    @item = Item.new(item_params)
    uploaded_images.each {|image| @item.images.attach(image)} if uploaded_images.present?
    if @item.save
      redirect_to @item, notice: 'Item was successfully created.'
    else
      render :new
    end
  end

  def update
    @item.images.detach
    uploaded_images.each {|image| @item.images.attach(image)} if uploaded_images.present?
    if @item.update(item_params)
      redirect_to @item, notice: 'Item was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @item.destroy
      redirect_to items_url, notice: 'Item was successfully destroyed.'
  end

  def upload_image
      @image_blob = create_blob(params[:image])
      respond_to do |format|
        format.json { @image_blob.id }
      end
  end


  private

  def set_item
    @item = Item.with_attached_images.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :description)
  end

  def uploaded_images
    params[:item][:images].map{|id| ActiveStorage::Blob.find(id)} if params[:item][:images]
  end

  def create_blob(uploading_file)
    ActiveStorage::Blob.create_after_upload! \
      io: uploading_file.open,
      filename: uploading_file.original_filename,
      content_type: uploading_file.content_type
  end
end
