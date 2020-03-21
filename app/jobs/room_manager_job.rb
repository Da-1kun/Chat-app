class RoomManagerJob < ApplicationJob
  queue_as :default

  def perform(chatroom_id, message_time, user_id, current_user)
    ActionCable.server.broadcast("room_manager_channel",
      id: chatroom_id, message_time: message_time,
      invited_user_id: user_id,
      username: current_user.username,
      user_photo: current_user.photo.url,
      online: current_user.online?,
      user_id: current_user.id
    )
  end
end
