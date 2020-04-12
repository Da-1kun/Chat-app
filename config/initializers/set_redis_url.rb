$redis = Redis.new(url: ENV["REDIS_URL"])
# ENV['REDIS_URL'] = Rails.application.credentials.redis_url  if  Rails.application.credentials.redis_url