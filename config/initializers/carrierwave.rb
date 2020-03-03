CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    :provider => 'AWS',
    :aws_access_key_id => Rails.application.credentials.aws[:access_key_id],
    :aws_secret_access_key => Rails.application.credentials.aws[:secret_access_key],
    :region => 'ap-northeast-1'
  }
  config.fog_directory = Rails.application.credentials.aws[:s3_bucket]
  config.fog_public = false
  config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
end