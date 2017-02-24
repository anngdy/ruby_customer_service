Rails.application.routes.draw do
  root to: 'users#index'  
  devise_for :users, controllers: {registrarions: 'users/registrarions'}
end
