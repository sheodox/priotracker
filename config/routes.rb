Rails.application.routes.draw do
  resources :todo do
    collection do
      post 'show_all'
    end
  end

  root 'application#index'
end
