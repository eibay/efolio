require 'sinatra'

get '/' do
  
  erb :index
end

get '/contact' do
  erb :contact
end

get '/about' do
  erb :about
end

get '/success' do
  erb("We will be in touch with you soon #{params[:name]}, by sending you updates at #{params[:email]}") #to render directly together with the layout

end

get '/info' do
  erb :info
end

get '/game' do
  erb :game
end

