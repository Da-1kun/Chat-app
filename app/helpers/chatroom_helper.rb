module ChatroomHelper
  def any_message?(chatroom_id)
    Message.where(chatroom_id: chatroom_id).any?
  end

  def message_created_at(chatroom_id)
    Message.latest_message(chatroom_id).created_at.strftime('%Y/%m/%d')
  end

  def content(chatroom_id)
    Message.latest_message(chatroom_id).content
  end

  def new_messages(chatroom_id)
    Message.new_messages(chatroom_id)
  end
end
