module MessageHelper
  def latest_message(chatroom)
    if chatroom.content?
      chatroom.content
    else 
      chatroom.message_user_id == current_user.id ? 'you sent a image' : "#{chatroom.user.username} sent a image"
    end
  end

  def new_messages(chatroom_id)
    Message.recent_messages(chatroom_id)
  end
end
