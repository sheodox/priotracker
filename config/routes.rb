Rails.application.routes.draw do
  resources :todo

  root 'application#index'
end
