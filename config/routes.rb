Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  root 'sessions#new'
  get 'signup', to: 'users#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  post 'messages', to: 'messages#create'
  resources :users
  resources :chatrooms
end
