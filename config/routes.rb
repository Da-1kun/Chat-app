Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  root 'sessions#new'
  post 'login', to: 'sessions#create'
  get 'login', to: 'sessions#new'
  delete 'logout', to: 'sessions#destroy'
  post 'messages', to: 'messages#create'
  resources :users, except: [:show, :edit]
  resources :chatrooms, only: [:index, :create, :destroy]
end
