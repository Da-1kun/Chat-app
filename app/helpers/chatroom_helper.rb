module ChatroomHelper
  def message_created_at(created_at)
    created_at.strftime('%Y/%m/%d')
  end

  def new_messages(chatroom_id)
    Message.recent_messages(chatroom_id)
  end
end
