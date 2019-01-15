Rails.application.routes.draw do
  root 'items#index'
  resources :items do
    collection do
      post 'upload_image'
    end
  end
end
